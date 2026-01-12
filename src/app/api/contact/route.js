import { NextResponse } from "next/server";

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

export async function POST(req) {
	try {
		const formData = await req.json();

		// Validate form data
		const validationErrors = validateFormData(formData);
		if (validationErrors.length > 0) {
			return NextResponse.json({ error: validationErrors.join(", ") }, { status: 400 });
		}

		const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

		// Check if Google Apps Script URL is configured
		if (!scriptUrl) {
			// In development or if not configured, just log and return success
			console.log("Contact form submission (Google Apps Script not configured):", formData);
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
		console.error("Contact form submission error:", error);

		if (error.name === "TimeoutError") {
			return NextResponse.json({ error: "Request timed out. Please try again." }, { status: 408 });
		}

		return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
	}
}
