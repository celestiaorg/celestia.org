import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { email } = await req.json();

		if (!email || !email.includes("@")) {
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

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data.detail || "Failed to subscribe" }, { status: response.status });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		if (error.name === "TimeoutError") {
			return NextResponse.json({ error: "Request timed out" }, { status: 408 });
		}
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
