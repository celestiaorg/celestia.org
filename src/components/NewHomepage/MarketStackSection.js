"use client";

import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

// Feature card component with alternating image/text layout
const FeatureCard = ({ title, description, imageSrc, imageAlt, imagePosition = "left", buttons = [] }) => {
	const imageOrderClass = imagePosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = imagePosition === "left" ? "order-2" : "order-2 md:order-1";

	return (
		<div className='flex flex-col md:flex-row items-stretch'>
			{/* Image */}
			<div className={`relative w-full md:w-1/2 h-[400px] md:h-[650px] bg-[#f7f7f7] ${imageOrderClass}`}>
				<img src={imageSrc} alt={imageAlt} className='absolute inset-0 w-full h-full object-cover' />
			</div>

			{/* Text content */}
			<div
				className={`flex flex-col gap-6 justify-center w-full md:w-1/2 px-6 py-10 md:px-[80px] lg:px-[120px] xl:px-[200px] ${textOrderClass}`}
			>
				<h3 className='font-untitledSans font-medium text-[32px] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.04em] text-[#17141a]'>
					{title}
				</h3>
				<p className='font-untitledSans text-[16px] md:text-[18px] leading-[1.55] text-[#17141a]'>{description}</p>
				<div className='flex flex-wrap items-center gap-4'>
					{buttons.map((button, index) => (
						<PrimaryButton
							key={index}
							href={button.href}
							variant={button.variant}
							size='xl'
							noBorder={button.variant === "purple"}
							showArrow={button.showArrow}
						>
							{button.label}
						</PrimaryButton>
					))}
				</div>
			</div>
		</div>
	);
};

const MarketStackSection = () => {
	const features = [
		{
			title: "Confidentiality",
			description:
				"Celestia Private Blockspace makes it possible to build verifiably private onchain finance apps that can leverage millisecond latency speeds, yet keep balances, positions, and order sizes confidential.",
			imageSrc: "/images/placeholder.jpg",
			imageAlt: "Confidentiality visualization",
			imagePosition: "left",
			buttons: [{ label: "Learn more", href: "/learn/", variant: "purple-bright" }],
		},
		{
			title: "Interoperability",
			description: "Instant access to assets anywhere with Celestia Lazybridging.",
			imageSrc: "/images/placeholder.jpg",
			imageAlt: "Interoperability visualization",
			imagePosition: "right",
			buttons: [{ label: "Learn More", href: "/learn/", variant: "purple-bright" }],
		},
		{
			title: "Programmable Liquidity",
			description:
				"Eden is the native execution environment of the Celestia network. Serving as the hub for TIA DeFi, Eden enables anyone to directly deploy and use applications in a credibly neutral environment.",
			imageSrc: "/images/placeholder.jpg",
			imageAlt: "Programmable Liquidity visualization",
			imagePosition: "left",
			buttons: [
				{ label: "Learn More", href: "/learn/", variant: "purple-bright" },
				{ label: "Developer Docs", href: "/developers/", variant: "ghost-dark", showArrow: true },
			],
		},
	];

	return (
		<section data-header-theme='light' className='bg-white'>
			{/* Section title */}
			<Container size='lg' className='py-[60px] md:py-[80px]'>
				<h2 className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-0.07em] text-[#17141a] text-center'>
					Explore Celestia&apos;s Market Stack
				</h2>
			</Container>

			{/* Feature cards - full width */}
			<div className='flex flex-col'>
				{features.map((feature, index) => (
					<FeatureCard
						key={index}
						title={feature.title}
						description={feature.description}
						imageSrc={feature.imageSrc}
						imageAlt={feature.imageAlt}
						imagePosition={feature.imagePosition}
						buttons={feature.buttons}
					/>
				))}
			</div>
		</section>
	);
};

export default MarketStackSection;
