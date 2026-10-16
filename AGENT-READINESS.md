# Agent readiness

The website serves product content; blockchain integration documentation lives at https://docs.celestia.org/. The website OpenAPI document must not be confused with the node API's OpenRPC specifications.

## Audit coverage

| Audit item | Repository behavior or remaining action |
| --- | --- |
| 1. HTML without JavaScript | Server-rendered homepage contains an H1 and over 500 characters of main content. The verifier excludes navigation, scripts, styles, and SVGs from this count. |
| 2. Crawler access | robots.txt permits crawlers, including Claude-User. On October 15, 2026, all four audited User-Agent strings received HTTP 200 with homepage content from this machine. This does not verify crawler identity or access from other networks. Review the scanner's blocked requests in WAF logs. |
| 3. OpenAPI | `/openapi.json` describes the existing website health, contact, and newsletter APIs using OpenAPI 3.1.1. |
| 4. JSON errors | Application API errors provide `error`, `code`, and `hint`; unknown API paths return JSON 404, unsupported methods return JSON 405 with `Allow`. HEAD responses have no body. |
| 5. Markdown negotiation | Homepage GET/HEAD negotiates HTML and Markdown using Accept quality and specificity, returning 406 if neither is acceptable. Markdown includes `Vary: Accept`; both variants are uncached because Next.js overwrites HTML Vary. Preserve `no-store` at the CDN. |
| 6. Brand discoverability | Homepage title identifies Celestia's modular blockchain and data availability product. Search ranking and backlinks need marketing and Search Console follow-up. |
| 7. Developer portal | `/developers/` and `/docs/` redirect to the existing canonical developer portal. A new hosted sandbox or API-key service would require a separate product decision. |
| 8. JSON-LD | Organization and WebSite entities remain available in raw HTML. |
| 9. Public API/docs discovery | Existing homepage navigation links to developer docs. HTTP Link headers, homepage Markdown, and llms.txt advertise the website API catalog, OpenAPI, and API documentation. `/.well-known/api-catalog` lists the existing endpoints using RFC 9727 Linkset JSON, with the media type, profile, and discovery header on GET and HEAD. |
| 10. Rate limits | Newsletter provider 429 responses include Retry-After. No per-client quota exists in this app; choose and enforce a real quota at the edge before publishing RateLimit or RateLimit-Policy. Do not advertise the shared Mailchimp quota as a client allowance. |
| 11–12. Schema/function calling | Each documented operation has a unique operationId, description, and typed schemas where a body exists. There is no website GraphQL endpoint to expose. |
| 13. Sitemap | The existing XML sitemap covers public routes and glossary entries. Optional lastmod values remain omitted until a reliable source of per-page content modification dates exists; build time is not a content modification date. |
| 14. Metadata | Canonical URL, html language, OG image, and OG type are checked against a running production build. |
| 15. Organization contacts | A separate website-operator entity uses Strange Loop Labs AG's privacy contact and PostalAddress from `/privacy/#contact-us`. It does not assign the decentralized network a legal address. Keep this synchronized with the privacy policy. |
| 16. Trust pages | About, contact, and privacy contain at least 500 characters in their main content. Contact copy adds useful project inquiry guidance within the existing layout. |
| 17. Developer resources | llms.txt links to the developer portal, Node API/authentication reference, client SDKs, agent skill, website OpenAPI, and API examples. Search indexing still depends on crawler access and recrawling. |

## Additional agent-discovery checklist

The October 15 checklist includes features beyond this website's current services. Treat missing features according to their applicability, and verify implemented features against production after deployment.

| Checklist item | Disposition |
| --- | --- |
| HTTP Link headers, Markdown negotiation, API catalog | Implemented above. Markdown negotiation covers the homepage only; validate all three at the CDN after deployment. |
| Content Signals | Follow-up for the site owner to decide content-use preferences. Do not copy the checklist's `ai-input=no` example without deciding whether to disallow AI input use. Existing crawler permissions do not settle that policy. |
| Agent skills index | Optional follow-up with the docs site, which hosts the existing `SKILL.md`. This website already links to that skill; an index would add another discovery path. |
| OAuth/OIDC discovery, OAuth Protected Resource Metadata, auth.md | Not applicable to the current website APIs, which do not use OAuth or offer agent registration. Revisit if those capabilities are introduced. |
| DNS-AID | Deferred until there is an agent service to advertise and an operational owner for its DNS records. |
| MCP Server Card | Not applicable: this website does not operate an MCP server. |
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

1. Deploy the application, preserve `Cache-Control: private, no-store` for both homepage formats, and purge old cached homepage responses. Review any Cloudflare Cache Rules that override origin caching. Leave asset caching unchanged.
2. Run `npm run verify-seo -- https://celestia.org`. It alternates HTML and Markdown requests at the same URL, checks discovery headers on both formats, and verifies the catalog's GET/HEAD responses, media type, profile, and links against OpenAPI. A passing origin check alone does not verify CDN behavior.
3. Inspect the homepage Markdown for useful content and links. Markdown negotiation currently covers only `/`; other website pages keep their existing HTML behavior. Next.js overwrites HTML `Vary`, so both formats must retain `no-store`; Markdown must include `Accept` in `Vary`.
4. Rerun Is Agentic and Cloudflare's checker using the same URL, site profile, and enabled checks as the baseline. Save the scan timestamp, check selection, and results. Their scores are separate measurements; a merged PR or local test does not establish a production score increase.

At the October 15 pre-deployment check, production still returned HTML to `Accept: text/markdown`. This application already handles homepage negotiation and discovery headers; do not add overlapping homepage conversion rules without testing their interaction.

The three hostname-scoped rules in the [Celestia docs Cloudflare guide](https://github.com/celestiaorg/docs/blob/main/config/cloudflare/README.md) apply to `docs.celestia.org`, whose static origin cannot supply those responses. Keep those rules scoped to that host. The marketing site's catalog media type is supplied by this application. If changing CDN rules here, record the existing settings and changed rule IDs; rollback only those changes, purge affected homepage variants, and verify HTML again.

Eden's implementation serves Vocs-generated Markdown through its Pages worker and advertises a working documentation MCP server. Its [discovery and Markdown work](https://github.com/celestiaorg/eden-docs/pull/183) and [API errors and developer guidance](https://github.com/celestiaorg/eden-docs/pull/184) are useful references. This marketing site exposes its existing health, contact, and newsletter APIs; it does not operate a docs MCP server or publish a server card claiming one exists.

If the scanner is challenged, inspect the matching CDN security events and narrow the specific offending rule. Do not allow requests solely because they claim an AI User-Agent or disable protection on write APIs. Edge-generated errors and rate-limit headers need configuration at the edge; application code cannot change responses generated before it runs.

Formats: [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html), [API catalog (RFC 9727)](https://www.rfc-editor.org/rfc/rfc9727.html), [Markdown negotiation](https://acceptmarkdown.com/), [Organization](https://schema.org/Organization), [sitemaps](https://www.sitemaps.org/protocol.html).
