export default {
	async fetch(request, env) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*", // Consider changing to your domain
			"Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "86400",
		};

		// Handle OPTIONS
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		// Handle POST
		if (request.method === "POST") {
			const headers = {
				...corsHeaders,
				"Content-Type": "application/json",
			};

			try {
				const { email } = await request.json();

				if (!email) {
					return new Response(JSON.stringify({ error: "Email required" }), {
						status: 400,
						headers,
					});
				}

				// Call Mailchimp API
				const DATACENTER = env.MAILCHIMP_API_KEY.split("-")[1];
				const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_LIST_ID}/members`, {
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

				const mailchimpData = await response.json();

				if (response.status === 200 || response.status === 201) {
					return new Response(JSON.stringify({ success: true }), { headers });
				}

				if (mailchimpData.title === "Member Exists") {
					return new Response(JSON.stringify({ error: "Already subscribed" }), { headers });
				}

				throw new Error(mailchimpData.detail || "Mailchimp error");
			} catch (err) {
				return new Response(JSON.stringify({ error: err.message }), {
					status: 500,
					headers,
				});
			}
		}

		// Handle unsupported methods
		return new Response("Method not allowed", {
			status: 405,
			headers: corsHeaders,
		});
	},
};
