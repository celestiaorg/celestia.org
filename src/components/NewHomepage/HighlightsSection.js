"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const highlights = [
	{
		logo: "/images/app/homepage/logo-relay.png",
		logoAlt: "Relay Chain",
		background: "/images/app/homepage/highlight-relay.webp",
		tag: "Payments",
		description: "Celestia's blockspace powers Relay's cross-chain payments settlement.",
		href: "#",
	},
	{
		logo: "/images/app/homepage/logo-bullet.svg",
		logoAlt: "Bullet",
		background: "/images/app/homepage/highlight-bullet.webp",
		tag: "DeFi",
		description:
			"Bullet is a decentralised perpetuals exchange, with Celestia's blockspace enabling Bullet to process up to 20k orders/second.",
		href: "#",
	},
];

// Case study card with full-bleed background image
const HighlightCard = ({ logo, logoAlt, background, tag, description, href, index }) => {
	return (
		<motion.div custom={index * 0.15} variants={cardVariants}>
			<Link href={href} className='group relative flex w-full h-[170px] md:h-[240px] rounded overflow-hidden bg-black border border-[rgba(226,232,240,0.1)] no-underline'>
				{/* Background image */}
				<div className='absolute inset-0 overflow-hidden'>
					<img
						src={background}
						alt=''
						className='w-full h-full object-cover opacity-70 scale-[1.3] transition-all duration-400 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:opacity-85 group-hover:scale-[1.4]'
					/>
					{/* Bottom gradient overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent' />
				</div>

				{/* Card content */}
				<div className='relative z-10 flex flex-col justify-between p-5 md:p-6 w-full'>
					{/* Logo top */}
					<div>
						<img
							src={logo}
							alt={logoAlt}
							className='h-7 md:h-8 w-auto object-contain brightness-0 invert'
						/>
					</div>

					{/* Text bottom */}
					<div>
						<span className='font-slussenMono text-[11px] font-medium uppercase tracking-[1.5px] text-white/55 mb-1.5 block'>
							{tag}
						</span>
						<p className='font-slussen text-[15px] md:text-[18px] leading-[1.2] tracking-[-0.04em] text-white'>
							{description}
						</p>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

const HighlightsSection = () => {
	return (
		<section data-header-theme='light' className='relative z-[2] bg-[#FDFCFF] py-16 md:py-20'>
			<Container size='lg'>
				<div className='flex flex-col gap-10 md:gap-12'>
					{/* Highlights label */}
					<motion.h3
						className='font-slussen font-medium text-[24px] tracking-[-0.5px] text-black/40'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={fadeUpVariants}
					>
						Highlights
					</motion.h3>

					{/* Case study cards */}
					<motion.div
						className='flex flex-col sm:flex-row gap-3 md:gap-5 -mt-4 sm:[&>*]:flex-1'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-50px" }}
						variants={staggerContainer}
					>
						{highlights.map((highlight, index) => (
							<HighlightCard key={index} index={index} {...highlight} />
						))}
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default HighlightsSection;
