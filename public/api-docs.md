# Celestia Website API

These endpoints belong to the Celestia marketing website. For blockchain integration, use the [Celestia developer portal](https://docs.celestia.org/), [Node API and authentication documentation](https://docs.celestia.org/build/rpc/node-api/), and [client SDK documentation](https://docs.celestia.org/build/rpc/clients/). The node API uses JSON-RPC and publishes OpenRPC schemas in its reference documentation. This website does not expose GraphQL or issue blockchain API keys.

## Schema and authentication

The [API catalog](https://celestia.org/.well-known/api-catalog) lists the website endpoints and links to their schema and documentation. It uses the RFC 9727 Linkset format.

The [OpenAPI 3.1.1 specification](https://celestia.org/openapi.json) describes the website endpoints, request fields, responses, and operation IDs. Use the canonical paths with trailing slashes to avoid redirects. Website endpoints do not require an API key. Newsletter subscriptions require a fresh reCAPTCHA token obtained in the website form. Service credentials stay on the server.

## Endpoints and examples

`GET /api/health/` returns `{"status":"ok"}` when the Next.js runtime can answer requests. `HEAD /api/health/` returns the same status without a body. This is a liveness check, not a check of newsletter or contact delivery.

```sh
curl -i https://celestia.org/api/health/
```

`POST /api/contact/` accepts a JSON object with required string fields `fullName`, `companyName`, `email`, and `interestedIn`. Optional strings are `telegram`, `website`, and `message`. Submit only with the user's consent. The existing development fallback returns success with an explicit message if the Google Apps Script integration is not configured; it does not confirm delivery. The visible contact form uses Google Forms separately.

```sh
curl -i https://celestia.org/api/contact/ \
  -H 'Content-Type: application/json' \
  --data '{"fullName":"Your name","companyName":"Your company","email":"you@example.com","interestedIn":"Dedicated blockchain development"}'
```

`POST /api/subscribe/` accepts `email` and `token` strings. Obtain the token through the newsletter form, and subscribe only an address whose owner has consented. A successful request returns `{"success":true}`. Do not bypass reCAPTCHA or assume the website offers an unattended subscription API.

```sh
curl -i https://celestia.org/api/subscribe/ \
  -H 'Content-Type: application/json' \
  --data '{"email":"you@example.com","token":"YOUR_FRESH_RECAPTCHA_TOKEN"}'
```

## Errors and retries

Application errors return `application/json` with an `error` string, a stable `code`, and a resolution `hint`. Invalid JSON or field values return 400. Unknown API paths return 404. Unsupported methods return 405 with `Allow`. HEAD responses have no body. For example:

```json
{"error":"Invalid JSON request body","code":"INVALID_JSON","hint":"Send a JSON object with Content-Type: application/json."}
```

Other codes include `INVALID_INPUT`, `INVALID_RECAPTCHA`, `ALREADY_SUBSCRIBED`, `CONTACT_FAILED`, `SUBSCRIPTION_FAILED`, `SERVICE_UNAVAILABLE`, `REQUEST_TIMEOUT`, and `RATE_LIMITED`. Do not retry `ALREADY_SUBSCRIBED`. Check whether a submission was received before retrying a timeout; writes are not idempotent.

A newsletter provider 429 becomes a JSON 429 with `Retry-After`. The value is the provider's delay in seconds or HTTP date, or 60 seconds if none was supplied. The website has no configured per-client quota and does not invent `RateLimit` or `RateLimit-Policy` values from a shared provider quota. CDN/WAF limits are managed separately and may respond before the application; operators must configure their headers and JSON errors at the edge.

## Homepage content negotiation

Request the homepage with `Accept: text/markdown` for Markdown, or `Accept: text/html` for HTML. Quality values are respected; unsupported representation requests return 406. Markdown responses include `Vary: Accept`. Both formats use `Cache-Control: private, no-store` because this Next.js version overwrites the HTML `Vary` header. CDN rules must preserve this cache policy.

```sh
curl -sS -L -i -H 'Accept: text/markdown' https://celestia.org/
curl -sS -L -i -H 'Accept: text/html' https://celestia.org/
```

Use [llms.txt](https://celestia.org/llms.txt) for the content directory and [sitemap.xml](https://celestia.org/sitemap.xml) for indexable pages.
