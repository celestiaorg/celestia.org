"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";

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

// Benefit card component with alternating image/text layout
const BenefitCard = ({ title, description, imageSrc, imageAlt, imagePosition = "right", index = 0 }) => {
	const imageOrderClass = imagePosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = imagePosition === "left" ? "order-2" : "order-2 md:order-1";

	return (
		<motion.div
			className='flex flex-col md:flex-row items-stretch border border-[rgba(226,232,240,0.05)] rounded-[24px] md:rounded-[32px] overflow-hidden bg-[linear-gradient(180deg,rgba(23,20,26,0)_0%,rgba(81,81,81,0.1)_100%)]'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: "-50px" }}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.7,
						delay: index * 0.15,
						ease: [0.25, 0.4, 0.25, 1],
					},
				},
			}}
			style={{ willChange: "opacity, transform", backfaceVisibility: "hidden" }}
		>
			<div className={`relative w-full md:w-1/2 h-[280px] md:h-[400px] ${imageOrderClass}`} style={{ transform: "translateZ(0)" }}>
				<img
					src={imageSrc}
					alt={imageAlt}
					className='absolute inset-0 w-full h-full object-cover mix-blend-lighten'
					style={{ backfaceVisibility: "hidden" }}
				/>
			</div>
			<div className={`flex flex-col gap-4 justify-center w-full md:w-1/2 px-6 py-8 md:px-[80px] md:py-0 ${textOrderClass}`}>
				<h3 className='font-untitledSans font-medium text-[28px] md:text-[40px] leading-tight tracking-[-0.05em] text-white'>{title}</h3>
				<p className='font-untitledSans text-[16px] md:text-[20px] leading-[1.35] text-[#F5EDFE]'>{description}</p>
			</div>
		</motion.div>
	);
};

const BenefitsSection = () => {
	const benefits = [
		{
			title: "Low-latency",
			description:
				"Reach millisecond latency with Celestia underneath. Celestia powers dedicated networks to achieve fibre optic pace for onchain markets.",
			imageSrc: "/images/app/homepage/benefits-low-latency.png",
			imageAlt: "Low-latency visualization",
			imagePosition: "right",
		},
		{
			title: "Specialisation",
			description:
				"With Celestia, markets are purpose-built: custom execution, fees, privacy, and matching logic optimised for their asset, participants, and latency needs, without generic constraints.",
			imageSrc: "/images/app/homepage/benefits-specialisation.png",
			imageAlt: "Specialisation visualization",
			imagePosition: "left",
		},
		{
			title: "High-volume",
			description:
				"Celestia's high-bandwidth blockspace enables markets that can scale to any size to support demand from users in every corner of the world.",
			imageSrc: "/images/app/homepage/benefits-high-volume.png",
			imageAlt: "High-volume visualization",
			imagePosition: "right",
		},
	];

	return (
		<section data-header-theme='dark' className='bg-[#17141A] pb-[80px] pt-8 md:pt-24 md:pb-[144px]'>
			<Container size='lg'>
				<div className='flex flex-col gap-[64px] md:gap-[96px]'>
					{/* Header */}
					<motion.div
						className='flex flex-col gap-8 items-center text-center'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						<motion.h2
							className='font-untitledSans text-center font-medium text-[32px] md:text-[40px] lg:text-[48px] lg:leading-[48px] xl:text-[64px] leading-[1.17] xl:leading-[64px] tracking-[-2px] text-white text-pretty'
							variants={fadeUpVariants}
						>
							Celestia&apos;s terabit-scale blockspace provides the properties that allow markets to cut ahead of the rest.
						</motion.h2>
						<motion.a
							href='https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/'
							className='border border-white rounded-[24px] px-4 py-4 font-untitledSans font-medium text-[14px] text-white uppercase tracking-[0.225px] hover:bg-white/10 transition-colors'
							variants={fadeUpVariants}
						>
							LEARN MORE ABOUT FIBRE BLOCKSPACE
						</motion.a>
					</motion.div>

					{/* Benefit cards */}
					<div className='flex flex-col gap-8 md:gap-12'>
						{benefits.map((benefit, index) => (
							<BenefitCard
								key={index}
								index={index}
								title={benefit.title}
								description={benefit.description}
								imageSrc={benefit.imageSrc}
								imageAlt={benefit.imageAlt}
								imagePosition={benefit.imagePosition}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BenefitsSection;
