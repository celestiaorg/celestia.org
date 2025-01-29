import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

// Validate required environment variables
const requiredEnvVars = ["MAILCHIMP_API_KEY", "MAILCHIMP_LIST_ID", "MAILCHIMP_SERVER_PREFIX", "RECAPTCHA_SECRET_KEY"];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Missing required environment variable: ${envVar}`);
		throw new Error(`Missing required environment variable: ${envVar}`);
	}
}

// Configure Mailchimp
mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER_PREFIX,
});

function isValidEmail(email) {
	// More comprehensive email validation
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return (
		typeof email === "string" &&
		email.length <= 320 && // Max email length
		email.length >= 3 && // Min reasonable length
		emailRegex.test(email)
	);
}

async function verifyRecaptcha(token) {
	if (!process.env.RECAPTCHA_SECRET_KEY) {
		console.error("Missing RECAPTCHA_SECRET_KEY");
		return false;
	}

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

async function subscribeToMailchimp(email) {
	try {
		// Check if member exists
		try {
			const subscriberHash = mailchimp.helpers.getMemberHash(email.toLowerCase());
			const response = await mailchimp.lists.getListMember(process.env.MAILCHIMP_LIST_ID, subscriberHash);

			if (response.status === "subscribed") {
				return {
					success: false,
					status: 400,
					error: "Already subscribed",
				};
			}
		} catch (error) {
			// Member not found - continue with subscription
			if (error.status !== 404) {
				throw error;
			}
		}

		// Subscribe the member
		const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
			email_address: email,
			status: "subscribed",
		});

		return {
			success: true,
			status: 200,
			data: {
				id: response.id,
				email: response.email_address,
				status: response.status,
			},
		};
	} catch (error) {
		console.error("Mailchimp API Error:", error);

		if (error.status === 400) {
			return {
				success: false,
				status: 400,
				error: error.response?.body?.detail || "Invalid email format",
			};
		}

		if (error.status === 401) {
			console.error("Mailchimp authentication failed");
			return {
				success: false,
				status: 500, // Return 500 to hide API issues from client
				error: "Internal server error",
			};
		}

		if (error.status === 429) {
			return {
				success: false,
				status: 429,
				error: "Too many requests, please try again later",
			};
		}

		// Detailed logging for unexpected errors
		console.error("Unexpected Mailchimp error:", {
			message: error.message,
			stack: error.stack,
			response: error.response,
		});

		throw error; // Let the main handler catch other errors
	}
}

export async function POST(request) {
	try {
		const { email, token } = await request.json();

		// Validate reCAPTCHA first
		if (!token || !(await verifyRecaptcha(token))) {
			return NextResponse.json({ success: false, error: "Invalid reCAPTCHA" }, { status: 400 });
		}

		if (!email || !isValidEmail(email)) {
			return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
		}

		// Subscribe to Mailchimp
		const result = await subscribeToMailchimp(email);

		return NextResponse.json({ success: result.success, error: result.error }, { status: result.status });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
	}
}
