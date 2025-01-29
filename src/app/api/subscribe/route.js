import { NextResponse } from "next/server";

// Add validation check for required env vars
const requiredEnvVars = ["MAILCHIMP_API_KEY", "MAILCHIMP_LIST_ID", "MAILCHIMP_SERVER_PREFIX", "RECAPTCHA_SECRET_KEY"];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Missing required environment variable: ${envVar}`);
		throw new Error(`Missing required environment variable: ${envVar}`);
	}
}

async function verifyRecaptcha(token) {
	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
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

export async function POST(req) {
	try {
		const { email, token } = await req.json();

		// Verify reCAPTCHA first
		if (!token || !(await verifyRecaptcha(token))) {
			return NextResponse.json({ error: "Invalid reCAPTCHA" }, { status: 400 });
		}

		if (!isValidEmail(email)) {
			return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
		}

		const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
		const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
		const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

		if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
			return NextResponse.json({ error: "Missing Mailchimp configuration" }, { status: 500 });
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

		if (response.status === 400) {
			const data = await response.json();
			if (data.title === "Member Exists") {
				return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
			}
		}

		if (response.status === 429) {
			return NextResponse.json({ error: "Too many requests" }, { status: 429 });
		}

		const data = await response.json();

		if (!response.ok) {
			console.error("Mailchimp API Error:", data);
			return NextResponse.json({ error: data.detail || "Failed to subscribe" }, { status: response.status });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("API Error:", error);
		if (error.name === "TimeoutError") {
			return NextResponse.json({ error: "Request timed out" }, { status: 408 });
		}
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

function isValidEmail(email) {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return (
		typeof email === "string" &&
		email.length <= 320 && // Max email length
		email.length >= 3 && // Min reasonable length
		emailRegex.test(email)
	);
}
