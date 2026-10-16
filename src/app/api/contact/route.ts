import { NextRequest, NextResponse } from "next/server";

import { sanitizeForLog } from "@/utils/sanitizeForLog";
import { apiError, InvalidJsonError, methodNotAllowed, readJsonObject } from "@/lib/apiError";

/**
 * Contact Form API Route
 *
 * Submits contact form data to Google Sheets via Google Apps Script.
 *
 * Required Environment Variable:
 * - GOOGLE_APPS_SCRIPT_URL: The deployed Google Apps Script web app URL
 *
 * See docs/google-forms-setup.md for setup instructions.
 */

interface ContactFormBody {
	fullName?: string;
	companyName?: string;
	email?: string;
	interestedIn?: string;
	telegram?: string;
	website?: string;
	message?: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return typeof email === "string" && email.length <= 320 && email.length >= 3 && emailRegex.test(email);
}

// Validate required fields
function validateFormData(data: ContactFormBody): string[] {
	const errors: string[] = [];

	if (!data.fullName || data.fullName.trim().length === 0) {
		errors.push("Full Name is required");
	}

	if (!data.companyName || data.companyName.trim().length === 0) {
		errors.push("Company Name is required");
	}

	if (!data.email || !isValidEmail(data.email)) {
		errors.push("Valid email is required");
	}

	if (!data.interestedIn || data.interestedIn.trim().length === 0) {
		errors.push("Please select what you're interested in");
	}

	return errors;
}

export async function POST(req: NextRequest) {
	try {
		const body = await readJsonObject(req);
		const fields = ["fullName", "companyName", "email", "interestedIn", "telegram", "website", "message"];
		if (fields.some((field) => body[field] !== undefined && typeof body[field] !== "string")) {
			return apiError(400, "INVALID_INPUT", "Contact fields must be strings", "Send string values for the fields in /openapi.json.");
		}
		const formData = body as ContactFormBody;

		// Validate form data
		const validationErrors = validateFormData(formData);
		if (validationErrors.length > 0) {
			return apiError(400, "INVALID_INPUT", validationErrors.join(", "), "Provide fullName, companyName, email, and interestedIn.");
		}

		const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

		// Check if Google Apps Script URL is configured
		if (!scriptUrl) {
			// In development or if not configured, just log and return success
			console.log("Contact form submission (Google Apps Script not configured):", sanitizeForLog(formData));
			return NextResponse.json({
				success: true,
				message: "Form received (Google Apps Script integration not configured)",
			});
		}

		// Submit to Google Apps Script
		const response = await fetch(scriptUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fullName: formData.fullName,
				telegram: formData.telegram || "",
				companyName: formData.companyName,
				email: formData.email,
				website: formData.website || "",
				interestedIn: formData.interestedIn,
				message: formData.message || "",
				timestamp: new Date().toISOString(),
			}),
		});

		// Google Apps Script may redirect, which is fine
		// We mainly care that the request was accepted
		if (!response.ok && response.status !== 302) {
			const errorText = await response.text();
			console.error("Google Apps Script error:", response.status, errorText);
			throw new Error("Failed to submit to Google Sheets");
		}

		return NextResponse.json({
			success: true,
			message: "Your message has been sent successfully",
		});
	} catch (error) {
		if (error instanceof InvalidJsonError) {
			return apiError(400, "INVALID_JSON", "Invalid JSON request body", "Send a JSON object with Content-Type: application/json.");
		}
		console.error("Contact form submission error:", error);

		if (error instanceof Error && error.name === "TimeoutError") {
			return apiError(408, "REQUEST_TIMEOUT", "Request timed out. Please try again.", "Wait before retrying; confirm whether the message was received.");
		}

		return apiError(500, "CONTACT_FAILED", "Failed to send message. Please try again later.", "Try the contact form at /contact/ or retry later.");
	}
}

export function GET() { return methodNotAllowed("POST, OPTIONS"); }
export function OPTIONS() { return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } }); }
export const HEAD = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
