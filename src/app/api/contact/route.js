import { NextResponse } from "next/server";

/**
 * Contact Form API Route
 *
 * Submits contact form data to Google Forms.
 *
 * Required Environment Variables:
 * - GOOGLE_FORM_URL: The Google Form formResponse URL
 *   (e.g., https://docs.google.com/forms/d/e/FORM_ID/formResponse)
 *
 * - GOOGLE_FORM_ENTRY_FULL_NAME: Entry ID for Full Name field
 * - GOOGLE_FORM_ENTRY_TELEGRAM: Entry ID for Telegram field
 * - GOOGLE_FORM_ENTRY_COMPANY_NAME: Entry ID for Company Name field
 * - GOOGLE_FORM_ENTRY_EMAIL: Entry ID for Email field
 * - GOOGLE_FORM_ENTRY_WEBSITE: Entry ID for Website/Socials field
 * - GOOGLE_FORM_ENTRY_INTERESTED_IN: Entry ID for Interested In field
 * - GOOGLE_FORM_ENTRY_MESSAGE: Entry ID for Message field
 *
 * To find entry IDs:
 * 1. Open your Google Form in preview mode
 * 2. Right-click on an input field and select "Inspect"
 * 3. Find the input's name attribute (e.g., name="entry.1234567890")
 * 4. The number after "entry." is your entry ID
 */

// Field mapping configuration
const FIELD_MAPPING = {
	fullName: "GOOGLE_FORM_ENTRY_FULL_NAME",
	telegram: "GOOGLE_FORM_ENTRY_TELEGRAM",
	companyName: "GOOGLE_FORM_ENTRY_COMPANY_NAME",
	email: "GOOGLE_FORM_ENTRY_EMAIL",
	website: "GOOGLE_FORM_ENTRY_WEBSITE",
	interestedIn: "GOOGLE_FORM_ENTRY_INTERESTED_IN",
	message: "GOOGLE_FORM_ENTRY_MESSAGE",
};

// Check if Google Forms is configured
function isGoogleFormsConfigured() {
	return !!process.env.GOOGLE_FORM_URL;
}

// Get entry ID from environment variable
function getEntryId(fieldName) {
	const envVar = FIELD_MAPPING[fieldName];
	return process.env[envVar] || null;
}

// Validate email format
function isValidEmail(email) {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return typeof email === "string" && email.length <= 320 && email.length >= 3 && emailRegex.test(email);
}

// Validate required fields
function validateFormData(data) {
	const errors = [];

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

// Submit to Google Forms
async function submitToGoogleForms(formData) {
	const googleFormUrl = process.env.GOOGLE_FORM_URL;

	if (!googleFormUrl) {
		throw new Error("Google Form URL not configured");
	}

	// Build URL-encoded form data
	const urlEncodedData = new URLSearchParams();

	// Map each field to its Google Forms entry ID
	Object.entries(formData).forEach(([fieldName, value]) => {
		const entryId = getEntryId(fieldName);
		if (entryId && value) {
			urlEncodedData.append(`entry.${entryId}`, value);
		}
	});

	const response = await fetch(googleFormUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: urlEncodedData.toString(),
		signal: AbortSignal.timeout(10000), // 10 second timeout
	});

	// Google Forms returns 200 on success
	// It may also return 302 redirect on success
	if (response.ok || response.status === 302) {
		return { success: true };
	}

	throw new Error(`Google Forms returned status ${response.status}`);
}

export async function POST(req) {
	try {
		const formData = await req.json();

		// Validate form data
		const validationErrors = validateFormData(formData);
		if (validationErrors.length > 0) {
			return NextResponse.json({ error: validationErrors.join(", ") }, { status: 400 });
		}

		// Check if Google Forms is configured
		if (!isGoogleFormsConfigured()) {
			// In development or if not configured, just log and return success
			console.log("Contact form submission (Google Forms not configured):", formData);
			return NextResponse.json({
				success: true,
				message: "Form received (Google Forms integration not configured)",
			});
		}

		// Submit to Google Forms
		await submitToGoogleForms(formData);

		return NextResponse.json({
			success: true,
			message: "Your message has been sent successfully",
		});
	} catch (error) {
		console.error("Contact form submission error:", error);

		if (error.name === "TimeoutError") {
			return NextResponse.json({ error: "Request timed out. Please try again." }, { status: 408 });
		}

		return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
	}
}
