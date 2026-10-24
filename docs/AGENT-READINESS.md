# Agent readiness

The website serves product content; blockchain integration documentation lives at https://docs.celestia.org/. The website OpenAPI document must not be confused with the node API's OpenRPC specifications.

## Audit coverage

| Audit item | Repository behavior or remaining action |
| --- | --- |
| 1. HTML without JavaScript | Server-rendered homepage contains one H1, sequential heading levels, and over 500 characters of main content. Shared dot-grid and letter-animation styles remove repeated inline styling while preserving the design. The verifier requires text to occupy at least 5% of main-element HTML; this local measurement excludes navigation and removes scripts, styles, and SVGs from the text count, and is not a claim about the external scanner score. |
| 2. Crawler access | robots.txt permits crawlers, including Claude-User. On October 15, 2026, all four audited User-Agent strings received HTTP 200 with homepage content from this machine. This does not verify crawler identity or access from other networks. Review the scanner's blocked requests in WAF logs. |
| 3. OpenAPI | `/openapi.json` describes the existing website health, contact, and newsletter APIs using OpenAPI 3.1.1. |
| 4. JSON errors | Application API errors provide `error`, `code`, and `hint`; unknown API paths return JSON 404, unsupported methods return JSON 405 with `Allow`. HEAD responses have no body. |
| 5. Markdown access | `/` negotiates the existing `/index.md` for GET/HEAD requests preferring Markdown, with `Content-Type: text/markdown` and `Cache-Control: private, no-store`. Both formats use `private, no-store` so caches never mix them (Next.js 16.4 replaces `Vary` on HTML/RSC, so `Vary: Accept` alone is not reliable). HTML wins equal preferences and remains the fallback. The homepage-only proxy preserves RSC, prefetch, and server-action requests. `/index.md` remains directly available and advertised by the homepage `Link` header and llms.txt. |
| 6. Brand discoverability | The existing homepage title is preserved. Positioning, title changes, search ranking, and backlinks need marketing ownership. |
| 7. Developer portal | `/developers/` and `/docs/` redirect to the existing canonical developer portal. A new hosted sandbox or API-key service would require a separate product decision. |
| 8. JSON-LD | Organization and WebSite entities remain available in raw HTML. |
| 9. Public API/docs discovery | Existing homepage navigation links to developer docs. HTTP Link headers, homepage Markdown, and llms.txt advertise the website API catalog, OpenAPI, and API documentation. `/.well-known/api-catalog` lists the existing endpoints using RFC 9727 Linkset JSON, with the media type, profile, and discovery header on GET and HEAD. |
| 10. Rate limits | Newsletter provider 429 responses include Retry-After. No per-client quota exists in this app; choose and enforce a real quota at the edge before publishing RateLimit or RateLimit-Policy. Do not advertise the shared Mailchimp quota as a client allowance. |
| 11–12. Schema/function calling | Each documented operation has a unique operationId, description, and typed schemas where a body exists. There is no website GraphQL endpoint to expose. |
| 13. Sitemap | The existing XML sitemap covers public routes and glossary entries. Optional lastmod values remain omitted until a reliable source of per-page content modification dates exists; build time is not a content modification date. |
| 14. Metadata | Canonical URL, html language, OG image, and OG type are checked against a running production build. |
| 15. Organization contacts | The existing Celestia Organization and WebSite publisher are preserved. Adding legal operator details, a postal address, or a privacy contact to JSON-LD requires brand/legal review and is outside this PR. |
| 16. Trust pages | About and privacy contain at least 500 characters in their main content. Contact retains its existing introduction; the verifier checks that copy without imposing a minimum length. Any expanded contact copy belongs to marketing. |
| 17. Developer resources | llms.txt provides task-specific when-to-use guidance and links to the developer portal, Node API/authentication reference, client SDKs, agent skill, website OpenAPI, and API examples. It explains how to request homepage Markdown and preserves consent and reCAPTCHA requirements. Search indexing still depends on crawler access and recrawling. |

## Additional agent-discovery checklist

The October 15 checklist includes features beyond this website's current services. Treat missing features according to their applicability, and verify implemented features against production after deployment.

| Checklist item | Disposition |
| --- | --- |
| HTTP Link headers, static Markdown, API catalog | Implemented above. Validate homepage discovery, `/index.md`, and the catalog at the CDN after deployment. Validate same-URL Markdown negotiation and HTML/Markdown cache separation as well. |
| Content Signals | robots.txt publishes `Content-Signal: search=yes, ai-input=yes, ai-train=yes` under `User-agent: *`. Change those values only with a site-owner decision; they are a policy statement, not an enforcement mechanism. |
| Agent skills index | `/.well-known/agent-skills/index.json` permanently redirects to the canonical docs-owned v0.2.0 index. The docs release maintains the skill and SHA-256 digest together; this repository does not vendor a second snapshot. The verifier checks the redirect and that the final JSON resolves; the docs repository validates the index contents. |
| OAuth/OIDC discovery, OAuth Protected Resource Metadata, auth.md | Not applicable to the current website APIs, which do not use OAuth or offer agent registration. Revisit if those capabilities are introduced. |
| DNS-AID | Deferred until there is an agent service to advertise and an operational owner for its DNS records. |
| MCP Server Card | This website does not operate an MCP server. It links to the existing documentation MCP service on `docs.celestia.org`; that service searches and reads docs, not blockchain state. |
| WebMCP | Deferred until there is a concrete browser-tool use case. Any form integration must preserve consent and reCAPTCHA requirements. |
| ARD manifest | Deferred; the existing API catalog and documentation links cover the current discovery needs. Revisit if additional services require a broader manifest. |

These dispositions are scope decisions, not scanner passes. Record the scanner's profile and enabled checks when comparing results.

## Verify before release

Use Node 22 and run:

```sh
npm test
npm run verify
docker build .
npm start -- --port 3100
# In another terminal:
npm run verify-seo -- http://localhost:3100
```

The endpoint verifier sends only invalid form requests. Unit tests mock external providers to cover successful submissions, reCAPTCHA failures, upstream errors, timeouts, and retry delays. They do not send email or write to Google Sheets.

The contact API preserves its existing success-with-warning development fallback when Google Apps Script is unconfigured. Confirm delivery configuration before using that endpoint operationally. The visible contact form posts to Google Forms separately.

## Deploy and verify at the CDN

1. Deploy the application and purge existing cached homepage variants. The homepage now returns `Cache-Control: private, no-store`; ensure CDN rules do not override this policy. Asset caching and the directly requested `/index.md` remain unchanged. Accept-based shared caching is a separate optimization requiring a verified cache key.
2. Run `npm run verify-seo -- https://celestia.org`. It verifies alternating HTML/Markdown GET/HEAD requests, cache policy, RSC behavior, discovery links, llms.txt structure, catalog responses against OpenAPI, and the skills-index redirect. A passing origin check alone does not verify CDN behavior.
3. Verify `curl -sS -L -i -H 'Accept: text/markdown' https://celestia.org/` returns useful Markdown, and repeat with `Accept: text/html` for HTML. A challenge or error document is not successful negotiation. Keep `public/index.md` aligned with the homepage and its linked product pages.
4. Rerun Is Agentic and Cloudflare's checker using the same URL, site profile, and enabled checks as the baseline. Save the scan timestamp, check selection, and results. Their scores are separate measurements; a merged PR or local test does not establish a production score increase.

The three hostname-scoped rules in the [Celestia docs Cloudflare guide](https://github.com/celestiaorg/docs/blob/main/config/cloudflare/README.md) apply to `docs.celestia.org`. Keep those rules scoped to that host. This application supplies the marketing site's catalog and Markdown media types; it does not need overlapping homepage conversion rules.

Eden's implementation serves Vocs-generated Markdown through its Pages worker and advertises a working documentation MCP server. Its [discovery and Markdown work](https://github.com/celestiaorg/eden-docs/pull/183) and [API errors and developer guidance](https://github.com/celestiaorg/eden-docs/pull/184) are useful references. This marketing site exposes its existing health, contact, and newsletter APIs; it does not operate a docs MCP server or publish a server card claiming one exists.

If the scanner is challenged, inspect the matching CDN security events and narrow the specific offending rule. Do not allow requests solely because they claim an AI User-Agent or disable protection on write APIs. Edge-generated errors and rate-limit headers need configuration at the edge; application code cannot change responses generated before it runs.

Formats: [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html), [API catalog (RFC 9727)](https://www.rfc-editor.org/rfc/rfc9727.html), [Organization](https://schema.org/Organization), [sitemaps](https://www.sitemaps.org/protocol.html).

Negotiation follows [HTTP Accept semantics (RFC 9110)](https://www.rfc-editor.org/rfc/rfc9110.html#name-accept). Agent guidance follows the [llms.txt file format](https://llmstxt.org/#format): introductory prose precedes H2 sections containing linked file lists.

The proxy returns Markdown directly from `public/index.md`; static rewrites can lose response headers. Markdown responses include `Vary: Accept` to make content negotiation explicit to clients and scanners. Keep `private, no-store` on both formats. A future shared-cache optimization must first preserve `Vary: Accept` on HTML, which Next.js 16.4 currently overwrites.


## October 22 scanner follow-up

The supplied Cloudflare scanner output reported HTTP 429 for the API catalog and the MCP-card path. A 429 is a rate-limit response, not proof that either resource is missing. Public probes from this machine returned 200 for the catalog, JSON 404 for `/api/` and `/api/not-an-endpoint/`, JSON 405 for `GET /api/contact/`, and 404 for the unpublished marketing-site MCP card. Python requests also received Cloudflare 403 / error 1010 while curl succeeded. These observations are requester-specific; they do not identify the responsible rule or prove that the external scanner can fetch every endpoint.

For the Cloudflare/DevOps owner:

1. Capture the failing scanner's UTC timestamp, URL, HTTP method, `CF-Ray`, response type, and `Retry-After`. The endpoint verifier reports this context for 403 and 429 responses and does not retry through a limit.
2. Correlate those requests with Cloudflare Security Events/Rate Limiting Analytics and origin logs. Identify whether the response came from an edge rule or the origin before changing configuration.
3. Adjust only the responsible policy for intended public GET/HEAD reads after reviewing the traffic. Preserve form/API write protections and reCAPTCHA. Do not trust a claimed AI User-Agent as authentication or disable protection globally.
4. Respect `Retry-After`, then repeat the actual scanner with its original profile and enabled checks. Save per-check results after deployment. The repository cannot fix responses generated before Next.js runs.

The Is Agentic JSON-error failure is not reproduced by the public API probes above. The app already supplies an error message, code, and resolution hint. Regression tests cover unknown routes, unsupported methods, invalid JSON, and input validation; the production-build verifier also follows slash redirects and checks HEAD behavior. Request the scanner's exact failing URL, method, status, and response if it still fails after deployment. Normal website 404 pages remain HTML.

DNS-AID needs an owned agent service and DNS changes. OAuth/OIDC, protected-resource metadata, and Auth.md require an actual authentication/registration product. A marketing-site MCP server card, WebMCP tools, and ARD manifest remain deferred until there is a concrete service or workflow to advertise. The existing documentation MCP endpoint is linked explicitly. Do not invent these services to raise a checklist score.

Name-based search discovery still depends on crawling and indexing. Public machine-readable guides use Celestia titles, predictable URLs, direct links, and the canonical developer portal; search ranking and recrawl timing are outside this PR.

References: [Agent Skills Discovery v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc), [Cloudflare HTTP 429](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-429/).
