import React from "react";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

// DEV-ONLY site map. The `.dev.js` extension is only registered as a page in
// development (see next.config.js `pageExtensions`), so this route does not
// exist in production builds at all. Reads the route tree off disk on each
// request so it always reflects the current files.
export const dynamic = "force-dynamic";

export const metadata = {
	title: "Dev · Site Map",
	robots: { index: false, follow: false },
};

const APP_DIR = path.join(process.cwd(), "src", "app");
const PAGE_RE = /^page\.(dev\.)?(js|jsx|ts|tsx)$/;
const ROUTE_RE = /^route\.(js|jsx|ts|tsx)$/;

interface RouteEntry {
	url: string;
	rel: string;
	dynamic: boolean;
}

interface ApiEntry {
	url: string;
	rel: string;
}

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(full));
		else out.push(full);
	}
	return out;
}

function segmentsOf(fileAbs: string): string[] {
	const parts = path.relative(APP_DIR, fileAbs).split(path.sep);
	parts.pop(); // drop the filename
	return parts;
}

// Route groups `(group)` are stripped; remaining segments form the URL.
function toUrl(segments: string[]): string {
	const clean = segments.filter((s) => !(s.startsWith("(") && s.endsWith(")")));
	return clean.length === 0 ? "/" : "/" + clean.join("/") + "/";
}

function buildModel() {
	const files = walk(APP_DIR);
	const routed: RouteEntry[] = [];
	const hidden: RouteEntry[] = [];
	const api: ApiEntry[] = [];

	for (const f of files) {
		const base = path.basename(f);
		const rel = path.relative(APP_DIR, f);

		if (ROUTE_RE.test(base)) {
			api.push({ url: toUrl(segmentsOf(f)), rel });
			continue;
		}
		if (!PAGE_RE.test(base)) continue;

		const segs = segmentsOf(f);
		const entry: RouteEntry = {
			url: toUrl(segs),
			rel,
			dynamic: segs.some((s) => s.includes("[")),
		};
		if (segs.some((s) => s.startsWith("_"))) hidden.push(entry);
		else routed.push(entry);
	}

	const byUrl = (a: { url: string }, b: { url: string }) => a.url.localeCompare(b.url);
	return {
		staticRoutes: routed.filter((r) => !r.dynamic).sort(byUrl),
		dynamicRoutes: routed.filter((r) => r.dynamic).sort(byUrl),
		hidden: hidden.sort((a, b) => a.rel.localeCompare(b.rel)),
		api: api.sort(byUrl),
	};
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
	return (
		<section className="mb-10">
			<h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
				{title} <span className="text-neutral-400">({count})</span>
			</h2>
			{children}
		</section>
	);
}

export default function DevSiteMap() {
	const { staticRoutes, dynamicRoutes, hidden, api } = buildModel();
	const total = staticRoutes.length + dynamicRoutes.length;

	return (
		<main className="min-h-screen bg-white text-neutral-900">
			<div className="mx-auto max-w-3xl px-6 py-16">
				<div className="mb-10">
					<span className="inline-block rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
						Development only
					</span>
					<h1 className="mt-4 text-3xl font-bold tracking-tight">Site Map</h1>
					<p className="mt-2 text-sm text-neutral-600">
						{total} live page{total === 1 ? "" : "s"} discovered under{" "}
						<code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">src/app</code>. This
						route is excluded from production builds.
					</p>
				</div>

				<Section title="Pages" count={staticRoutes.length}>
					<ul className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
						{staticRoutes.map((r) => (
							<li key={r.url}>
								<Link
									href={r.url}
									className="flex items-center justify-between gap-4 px-4 py-2.5 text-[15px] hover:bg-neutral-50"
								>
									<span className="font-medium text-blue-700">{r.url}</span>
									<span className="truncate text-xs text-neutral-400">{r.rel}</span>
								</Link>
							</li>
						))}
					</ul>
				</Section>

				{dynamicRoutes.length > 0 && (
					<Section title="Dynamic routes" count={dynamicRoutes.length}>
						<ul className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
							{dynamicRoutes.map((r) => (
								<li
									key={r.url}
									className="flex items-center justify-between gap-4 px-4 py-2.5 text-[15px]"
								>
									<span className="font-mono text-[13px] text-neutral-700">{r.url}</span>
									<span className="truncate text-xs text-neutral-400">{r.rel}</span>
								</li>
							))}
						</ul>
						<p className="mt-2 text-xs text-neutral-500">
							Dynamic segments (e.g. <code>[slug]</code>) need a real value to visit.
						</p>
					</Section>
				)}

				{hidden.length > 0 && (
					<Section title="Non-routed (underscore folders)" count={hidden.length}>
						<ul className="divide-y divide-neutral-100 rounded-lg border border-dashed border-neutral-200">
							{hidden.map((r) => (
								<li
									key={r.rel}
									className="flex items-center justify-between gap-4 px-4 py-2.5 text-[15px]"
								>
									<span className="text-neutral-400 line-through">{r.url}</span>
									<span className="truncate text-xs text-neutral-400">{r.rel}</span>
								</li>
							))}
						</ul>
						<p className="mt-2 text-xs text-neutral-500">
							Private folders (prefixed with <code>_</code>) are excluded from routing.
						</p>
					</Section>
				)}

				{api.length > 0 && (
					<Section title="API routes" count={api.length}>
						<ul className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
							{api.map((r) => (
								<li
									key={r.url}
									className="flex items-center justify-between gap-4 px-4 py-2.5 text-[15px]"
								>
									<span className="font-mono text-[13px] text-neutral-700">{r.url}</span>
									<span className="truncate text-xs text-neutral-400">{r.rel}</span>
								</li>
							))}
						</ul>
					</Section>
				)}
			</div>
		</main>
	);
}
