"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const resourceCards = [
	{
		title: "Documentation",
		description: "Documentation for the Celestia network.",
		href: "https://docs.celestia.org/",
		wide: false,
	},
	{
		title: "Pay for blobspace",
		description: "Post data to the Celestia network and use Celestia for payments.",
		href: "https://docs.celestia.org/learn/TIA/paying-for-blobspace/",
		wide: false,
	},
	{
		title: "Blog tutorial",
		description: "Read the tutorials and continue learning about Data Availability.",
		href: "https://docs.celestia.org/build/post-retrieve-blob/client/go/",
		wide: false,
	},
	{
		title: "Blobstream",
		description: "Use Celestia as the DA layer for your Ethereum L2 rollup.",
		href: "https://docs.celestia.org/build/blobstream/integrate-contracts/",
		wide: true,
	},
	{
		title: "Node API",
		description: "Use the celestia-node API to publish and retrieve transactions from Celestia.",
		href: "https://docs.celestia.org/build/rpc/node-api/",
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

const DevCard = ({ title, description, href, wide }) => {
	// Desktop: small cards = span-2 of 6, wide cards = span-3 of 6
	// Mobile: single column (all full width)
	const colSpan = wide ? "md:col-span-3" : "md:col-span-2";

	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={`group col-span-1 ${colSpan} flex flex-col justify-between gap-7 min-h-[190px] p-8 pb-7 rounded-xl border border-white/[0.07] bg-white/[0.025] transition-[background-color,border-color,box-shadow] duration-[250ms] hover:bg-white hover:border-black/[0.08] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]`}
		>
			<div>
				<h3 className='font-slussen font-medium text-[22px] leading-[1.2] tracking-[-0.7px] text-[#FDFCFF] mb-2.5 transition-colors duration-[250ms] group-hover:text-[#040207]'>
					{title}
				</h3>
				<p className='font-slussenMono text-[14px] leading-[22px] text-[#848B94] transition-colors duration-[250ms] group-hover:text-[#5a6070]'>
					{description}
				</p>
			</div>
			<span
				className='self-start inline-flex items-center font-slussen font-medium text-[13px] leading-[22px] tracking-[-0.03em] rounded-full border border-white/[0.12] bg-transparent px-5 py-2 text-white/60 transition-colors duration-[250ms] group-hover:text-black/65 group-hover:border-black/20'
			>
				Read More
			</span>
		</a>
	);
};

const BuildDevResources = () => {
	return (
		<section
			id='dev-resources'
			data-header-theme='dark'
			className='bg-[#040207] border-t border-white/[0.05] py-16 px-5 md:py-20 md:px-[60px] xl:px-[120px]'
		>
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
		</section>
	);
};

export default BuildDevResources;
