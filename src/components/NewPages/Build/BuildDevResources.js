"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Line icons ported from the prototype's .dev-card-icon SVGs (24×24, 1.5 stroke)
const icons = {
	docs: (
		<>
			<path d='M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z' />
			<path d='M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z' />
		</>
	),
	blob: (
		<>
			<ellipse cx='12' cy='6' rx='7' ry='3' />
			<path d='M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6' />
			<path d='M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6' />
		</>
	),
	blog: (
		<>
			<path d='M14 4l6 6L9 21H3v-6z' />
			<path d='M12.5 5.5l6 6' />
		</>
	),
	blobstream: (
		<>
			<polygon points='12 2 2 7 12 12 22 7 12 2' />
			<polyline points='2 17 12 22 22 17' />
			<polyline points='2 12 12 17 22 12' />
		</>
	),
	api: (
		<>
			<path d='M7 8l-4 4 4 4' />
			<path d='M17 8l4 4-4 4' />
			<path d='M13.5 5l-3 14' />
		</>
	),
};

const resourceCards = [
	{
		title: "Documentation",
		description: "Documentation for the Celestia network.",
		href: "https://docs.celestia.org/",
		icon: icons.docs,
		wide: false,
	},
	{
		title: "Pay for blobspace",
		description: "Post data to the Celestia network and use Celestia for payments.",
		href: "https://docs.celestia.org/learn/TIA/paying-for-blobspace/",
		icon: icons.blob,
		wide: false,
	},
	{
		title: "Blog tutorial",
		description: "Read the tutorials and continue learning about Data Availability.",
		href: "https://docs.celestia.org/build/post-retrieve-blob/client/go/",
		icon: icons.blog,
		wide: false,
	},
	{
		title: "Blobstream",
		description: "Use Celestia as the DA layer for your Ethereum L2 rollup.",
		href: "https://docs.celestia.org/build/blobstream/integrate-contracts/",
		icon: icons.blobstream,
		wide: true,
	},
	{
		title: "Node API",
		description: "Use the celestia-node API to publish and retrieve transactions from Celestia.",
		href: "https://docs.celestia.org/build/rpc/node-api/",
		icon: icons.api,
		wide: true,
	},
];

// Letter-by-letter reveal for the section heading (same pattern as prototype .title-char)
const AnimatedHeading = ({ text }) => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<h2
			ref={ref}
			className='font-slussenExtended font-medium text-[32px] leading-[36px] tracking-[-1.5px] md:text-[42px] md:leading-[48px] md:tracking-[-2px] text-white/[0.92] text-center w-full flex justify-center flex-wrap mb-10 md:mb-[52px]'
		>
			{text.split("").map((char, i) => (
				<span
					key={i}
					className='inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
					style={{
						transitionDelay: `${i * 40}ms`,
						opacity: visible ? 1 : 0,
						transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(40px) rotateX(90deg)",
						filter: visible ? "blur(0)" : "blur(8px)",
					}}
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</h2>
	);
};

const DevCard = ({ title, description, href, icon, wide }) => {
	// Desktop: small cards = span-2 of 6, wide cards = span-3 of 6
	// Mobile: single column (all full width)
	const colSpan = wide ? "md:col-span-3" : "md:col-span-2";

	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={`group col-span-1 ${colSpan} flex flex-col gap-[18px] min-h-[230px] p-7 rounded-xl border border-white/[0.07] bg-white/[0.025] transition-[background-color,border-color,box-shadow] duration-[250ms] hover:bg-white hover:border-black/[0.08] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]`}
		>
			{/* Icon chip — line icon in a soft rounded square, brand-purple stroke */}
			<span className='flex items-center justify-center w-[46px] h-[46px] rounded-[11px] bg-white/[0.05] border border-white/[0.06] transition-[background-color,border-color] duration-[250ms] group-hover:bg-black/[0.04] group-hover:border-black/[0.06]'>
				<svg
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-[23px] h-[23px] text-[#A88DE6]'
				>
					{icon}
				</svg>
			</span>

			<div className='flex flex-col gap-2'>
				<h3 className='font-slussenExtended font-medium text-[24px] leading-[1.2] tracking-[-0.025em] text-[#FDFCFF] transition-colors duration-[250ms] group-hover:text-[#040207]'>
					{title}
				</h3>
				<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#808890] transition-colors duration-[250ms] group-hover:text-[#636A74]'>
					{description}
				</p>
			</div>

			{/* Bottom arrow link — pinned to card base, arrow keeps a brand-purple pop */}
			<span className='mt-auto inline-flex items-center gap-[7px] font-slussen font-medium text-[13px] tracking-[-0.01em] text-white/60 transition-[color,gap] duration-[250ms] group-hover:text-[#040207] group-hover:gap-[11px]'>
				Read more
				<svg viewBox='0 0 16 16' fill='none' aria-hidden='true' className='w-[15px] h-[15px] text-[#A88DE6] transition-transform duration-[250ms] group-hover:translate-x-[2px]'>
					<path d='M6 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			</span>
		</a>
	);
};

const BuildDevResources = () => {
	return (
		<section
			id='dev-resources'
			data-header-theme='dark'
			className='bg-[#040207] border-t border-white/[0.05] py-16 px-6 min-[600px]:px-[60px] md:py-20 min-[1200px]:px-[120px]'
		>
			{/* Freeze: content caps at 1280px on wide screens */}
			<div className='mx-auto w-full max-w-[1280px]'>
			<AnimatedHeading text='Developer resources' />

			<motion.div
				className='grid grid-cols-1 md:grid-cols-6 gap-[10px]'
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				{resourceCards.map((card, i) => (
					<DevCard key={i} {...card} />
				))}
			</motion.div>
			</div>
		</section>
	);
};

export default BuildDevResources;
