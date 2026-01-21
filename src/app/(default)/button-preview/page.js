"use client";

import { Button } from "@/components/Button";
import PlusSVG from "@/macros/SVGs/PlusSVG";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

const Section = ({ title, children, dark = false }) => (
	<section className={`p-8 ${dark ? "bg-black" : "bg-white"}`}>
		<h2 className={`text-xl font-bold mb-6 ${dark ? "text-white" : "text-black"}`}>
			{title}
		</h2>
		<div className="flex flex-wrap items-center gap-4">{children}</div>
	</section>
);

export default function ButtonPreviewPage() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<div className="bg-black text-white p-8 border-b border-white/10">
				<h1 className="text-3xl font-bold mb-2">Button Component Preview</h1>
				<p className="text-white/60">
					All button variants, sizes, and states from the 2025 design system
				</p>
			</div>

			{/* Default Button (no props - shows configured defaults) */}
			<Section title="Default Button (no props)" dark>
				<Button>Default Button</Button>
			</Section>

			{/* Dark Theme */}
			<div className="bg-black p-8">
				<h2 className="text-2xl font-bold text-white mb-8 border-b border-white/20 pb-4">
					Dark Theme
				</h2>

				{/* Primary */}
				<Section title="Primary" dark>
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
					<Button disabled>Disabled</Button>
					<Button><PlusSVG /> With Icon</Button>
				</Section>

				{/* Outline */}
				<Section title="Outline" dark>
					<Button variant="outline" size="xs">Extra Small</Button>
					<Button variant="outline" size="sm">Small</Button>
					<Button variant="outline" size="md">Medium</Button>
					<Button variant="outline" size="lg">Large</Button>
					<Button variant="outline" disabled>Disabled</Button>
				</Section>

				{/* Subtle */}
				<Section title="Subtle" dark>
					<Button variant="subtle" size="xs">Extra Small</Button>
					<Button variant="subtle" size="sm">Small</Button>
					<Button variant="subtle" size="md">Medium</Button>
					<Button variant="subtle" size="lg">Large</Button>
					<Button variant="subtle" disabled>Disabled</Button>
				</Section>

				{/* Ghost */}
				<Section title="Ghost" dark>
					<Button variant="ghost" size="xs">Extra Small</Button>
					<Button variant="ghost" size="sm">Small</Button>
					<Button variant="ghost" size="md">Medium</Button>
					<Button variant="ghost" size="lg">Large</Button>
					<Button variant="ghost">With Arrow <ArrowRightSVG /></Button>
				</Section>
			</div>

			{/* Light Theme */}
			<div className="bg-white p-8">
				<h2 className="text-2xl font-bold text-black mb-8 border-b border-black/20 pb-4">
					Light Theme
				</h2>

				{/* Primary */}
				<Section title="Primary">
					<Button theme="light" size="xs">Extra Small</Button>
					<Button theme="light" size="sm">Small</Button>
					<Button theme="light" size="md">Medium</Button>
					<Button theme="light" size="lg">Large</Button>
					<Button theme="light" disabled>Disabled</Button>
					<Button theme="light"><PlusSVG /> With Icon</Button>
				</Section>

				{/* Outline */}
				<Section title="Outline">
					<Button variant="outline" theme="light" size="xs">Extra Small</Button>
					<Button variant="outline" theme="light" size="sm">Small</Button>
					<Button variant="outline" theme="light" size="md">Medium</Button>
					<Button variant="outline" theme="light" size="lg">Large</Button>
					<Button variant="outline" theme="light" disabled>Disabled</Button>
				</Section>

				{/* Subtle */}
				<Section title="Subtle">
					<Button variant="subtle" theme="light" size="xs">Extra Small</Button>
					<Button variant="subtle" theme="light" size="sm">Small</Button>
					<Button variant="subtle" theme="light" size="md">Medium</Button>
					<Button variant="subtle" theme="light" size="lg">Large</Button>
					<Button variant="subtle" theme="light" disabled>Disabled</Button>
				</Section>

				{/* Ghost */}
				<Section title="Ghost">
					<Button variant="ghost" theme="light" size="xs">Extra Small</Button>
					<Button variant="ghost" theme="light" size="sm">Small</Button>
					<Button variant="ghost" theme="light" size="md">Medium</Button>
					<Button variant="ghost" theme="light" size="lg">Large</Button>
					<Button variant="ghost" theme="light">With Arrow <ArrowRightSVG /></Button>
				</Section>
			</div>

			{/* Link Behavior */}
			<div className="bg-gradient-to-b from-purple-dark to-black p-8">
				<h2 className="text-2xl font-bold text-white mb-8 border-b border-white/20 pb-4">
					Link Behavior
				</h2>

				<Section title="Internal Links (NextLink)" dark>
					<Button href="/learn/">Internal Link</Button>
					<Button variant="outline" href="/ecosystem/">Ecosystem</Button>
				</Section>

				<Section title="External Links (target=_blank)" dark>
					<Button href="https://github.com/celestiaorg">GitHub</Button>
					<Button variant="outline" href="https://docs.celestia.org">Docs</Button>
				</Section>

				<Section title="Button Elements (onClick)" dark>
					<Button onClick={() => alert("Clicked!")}>Click Handler</Button>
					<Button variant="outline" type="submit">Submit</Button>
				</Section>
			</div>
		</div>
	);
}
