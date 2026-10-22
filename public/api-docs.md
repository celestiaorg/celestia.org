# Celestia Website API

These endpoints belong to the Celestia marketing website. For blockchain integration, use the setup links below and the [Node API reference](https://docs.celestia.org/build/rpc/node-api/). The node API uses JSON-RPC and publishes OpenRPC schemas in its reference documentation. This website does not expose GraphQL or issue blockchain API keys.

## Blockchain integration setup

Choose the path that matches your task:

1. **Use a hosted endpoint:** follow the [Go client tutorial](https://docs.celestia.org/build/post-retrieve-blob/client/go/) for prerequisites, network selection, endpoint configuration, account funding, and blob submission/retrieval. Rust applications can start from the [Rust client overview](https://docs.celestia.org/build/post-retrieve-blob/client/rust/) and its linked API documentation. Follow your provider's authentication requirements; website credentials are not blockchain credentials.
2. **Run your own node:** start with the [light-node quickstart](https://docs.celestia.org/operate/data-availability/light-node/quickstart/), then consult [node token generation](https://docs.celestia.org/operate/data-availability/light-node/advanced/#get-your-auth-token). For the permissions supported by your installed version, use `celestia light auth --help`. Keep tokens private and use the permissions required by your task. The client tutorials cover endpoint and token configuration; do not infer authentication details from the website OpenAPI specification.
3. **Find documentation through an agent:** use the [documentation index](https://docs.celestia.org/llms.txt) or connect an MCP client to `https://docs.celestia.org/api/mcp`. This documentation service accepts JSON-RPC POST requests and exposes `list_pages`, `read_page`, and `search_docs`. It reads documentation; it does not submit transactions or manage wallets. The [Celestia agent skill](https://docs.celestia.org/SKILL.md) provides task guidance and is separate from the MCP endpoint.

Use the linked guides for current versions, network settings, and examples. The documentation MCP service runs on `docs.celestia.org`; the website endpoints below run on `celestia.org`.

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

## Homepage Markdown

The homepage at `/` supports GET and HEAD content negotiation. Send `Accept: text/markdown` for the existing homepage Markdown, or `Accept: text/html` for the browser page. Quality values and media-range specificity determine the preferred supported representation; HTML wins ties and remains the fallback for missing or unsupported Accept values. Both representations use UTF-8. Next.js navigation, prefetch, and server-action requests retain their framework behavior.

Markdown homepage responses include `Vary: Accept` alongside the Next.js variation fields. Both HTML and Markdown use `Cache-Control: private, no-store` to prevent caches from mixing representations. Next.js 16.4 replaces `Vary` on HTML/RSC responses with its framework fields, so the no-store policy is required even when `Accept` is absent from those responses. Other pages and assets retain their caching. `/index.md` remains directly available and advertised by the homepage `Link` header with `rel="alternate"; type="text/markdown"`.

```sh
curl -sS -L -i -H 'Accept: text/markdown' https://celestia.org/
curl -sS -L -i -H 'Accept: text/html' https://celestia.org/
curl -sS -I -H 'Accept: text/markdown' https://celestia.org/
curl -sS -i https://celestia.org/index.md
```

Use [llms.txt](https://celestia.org/llms.txt) for the content directory and [sitemap.xml](https://celestia.org/sitemap.xml) for indexable pages.
