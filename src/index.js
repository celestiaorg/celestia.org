export default {
	async fetch(request, env) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "https://celestia.org",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Accept",
			"Content-Type": "application/json",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		if (request.method !== "POST") {
			return new Response("Method not allowed", {
				status: 405,
				headers: corsHeaders,
			});
		}

		try {
			const { email, recaptchaToken } = await request.json();

			if (!email || !recaptchaToken) {
				return new Response(JSON.stringify({ error: "Email and reCAPTCHA token required" }), {
					status: 400,
					headers: corsHeaders,
				});
			}

			// Verify reCAPTCHA first
			const recaptchaResponse = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
				{ method: "POST" }
			);

			const recaptchaData = await recaptchaResponse.json();
			if (!recaptchaData.success) {
				return new Response(JSON.stringify({ error: "Invalid reCAPTCHA" }), {
					status: 400,
					headers: corsHeaders,
				});
			}

			// Make Mailchimp API call server-side
			const response = await fetch(`https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_LIST_ID}/members`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${env.MAILCHIMP_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email_address: email,
					status: "subscribed",
				}),
			});

			const data = await response.json();

			if (response.status === 200 || response.status === 201) {
				return new Response(JSON.stringify({ success: true }), {
					headers: corsHeaders,
				});
			} else if (data.title === "Member Exists") {
				return new Response(JSON.stringify({ error: "Already subscribed" }), {
					headers: corsHeaders,
				});
			}

			throw new Error(data.detail || "Mailchimp error");
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: corsHeaders,
			});
		}
	},
};
