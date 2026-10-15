import { NextRequest, NextResponse } from "next/server";
import { apiError, InvalidJsonError, methodNotAllowed, readJsonObject } from "@/lib/apiError";

// Helper function to check required env vars at runtime
function checkRequiredEnvVars() {
	const requiredEnvVars = ["MAILCHIMP_API_KEY", "MAILCHIMP_LIST_ID", "MAILCHIMP_SERVER_PREFIX", "RECAPTCHA_SECRET_KEY"];
	for (const envVar of requiredEnvVars) {
		if (!process.env[envVar]) {
			console.error(`Missing required environment variable: ${envVar}`);
			throw new Error(`Missing required environment variable: ${envVar}`);
		}
	}
}

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
	// A missing token can never be a valid human verification.
	if (!token) {
		return false;
	}

	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY!, response: token }),
		});

		const data = await response.json();
		if (!data.success) {
			console.error("reCAPTCHA verification failed:", data["error-codes"]);
		}
		return data.success;
	} catch (error) {
		console.error("reCAPTCHA verification failed:", error);
		return false;
	}
}

export async function POST(req: NextRequest) {
	try {
		const { email, token } = await readJsonObject(req);
		if (typeof email !== "string" || !isValidEmail(email) || (token !== undefined && typeof token !== "string")) {
			return apiError(400, "INVALID_INPUT", "Invalid email address or token", "Provide a valid email string and a reCAPTCHA token string.");
		}
		if (typeof token !== "string" || !token) {
			return apiError(400, "INVALID_RECAPTCHA", "Invalid reCAPTCHA", "Complete reCAPTCHA in the website newsletter form.");
		}
		// Check required environment variables at runtime
		checkRequiredEnvVars();

		// The decision to proceed is controlled solely by the server-side
		// reCAPTCHA verification result, which is derived from Google's
		// siteverify response rather than directly from any user-supplied value.
		// verifyRecaptcha() also handles a missing/empty token internally.
		const isHuman = await verifyRecaptcha(token);
		if (!isHuman) {
			return apiError(400, "INVALID_RECAPTCHA", "Invalid reCAPTCHA", "Complete reCAPTCHA in the website newsletter form.");
		}

		const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
		const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
		const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

		if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
			return apiError(500, "SERVICE_UNAVAILABLE", "Missing Mailchimp configuration", "Retry later; the site operator must configure newsletter delivery.");
		}

		const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email_address: email,
				status: "subscribed",
			}),
			signal: AbortSignal.timeout(5000),
		});

		if (response.status === 429) {
			return apiError(429, "RATE_LIMITED", "Too many requests", "Wait for Retry-After before retrying.", {
				// Provider quotas are shared; this is a retry delay, not a per-client allowance.
				"Retry-After": response.headers.get("retry-after") || "60",
			});
		}

		const data = await response.json();
		if (response.status === 400 && data.title === "Member Exists") {
			return apiError(400, "ALREADY_SUBSCRIBED", "Already subscribed", "This address is already subscribed; no retry is needed.");
		}

		if (!response.ok) {
			console.error("Mailchimp API Error:", data);
			return apiError(response.status, "SUBSCRIPTION_FAILED", data.detail || "Failed to subscribe", "Check the email address or try again later using the website newsletter form.");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		if (error instanceof InvalidJsonError) {
			return apiError(400, "INVALID_JSON", "Invalid JSON request body", "Send a JSON object with Content-Type: application/json.");
		}
		console.error("API Error:", error);
		if (error instanceof Error && error.name === "TimeoutError") {
			return apiError(408, "REQUEST_TIMEOUT", "Request timed out", "Wait before retrying the newsletter form.");
		}
		return apiError(500, "SERVICE_UNAVAILABLE", "Internal server error", "Retry later; contact the site operator if the problem persists.");
	}
}

export function GET() { return methodNotAllowed("POST, OPTIONS"); }
export function OPTIONS() { return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } }); }
export const HEAD = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;

function isValidEmail(email: string): boolean {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return (
		typeof email === "string" &&
		email.length <= 320 && // Max email length
		email.length >= 3 && // Min reasonable length
		emailRegex.test(email)
	);
}
