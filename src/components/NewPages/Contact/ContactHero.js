"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import ContactForm from "@/components/ContactForm/ContactForm";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: (delay = 0) => ({
		opacity: 1,
		transition: {
			duration: 1,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const ContactHero = () => {
	return (
		<section data-header-theme='dark' className='relative bg-[#17141A] overflow-hidden'>
			{/* Background image with lighten blend */}
			<motion.div
				className='absolute inset-0 z-0'
				initial={{ scale: 1.1 }}
				whileInView={{ scale: 1 }}
				viewport={{ once: true }}
				transition={{
					duration: 1.2,
					delay: 0.2,
					ease: [0.25, 0.4, 0.25, 1],
				}}
			>
				<img
					src='/images/app/contact/contact-hero-new-image.png'
					alt=''
					className='absolute w-full h-full object-cover mix-blend-lighten opacity-80'
					style={{
						objectPosition: "center bottom",
					}}
				/>
			</motion.div>

			{/* Content */}
			<Container size='lg' className='relative z-10 pt-40 pb-72 lg:pb-80'>
				<div className='flex flex-col lg:flex-row gap-16 lg:gap-24 items-start'>
					{/* Left side - Heading */}
					<motion.div className='w-full lg:w-[340px] shrink-0' variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.1}>
						<h1 className='font-untitledSans font-medium text-white text-6xl md:text-7xl lg:text-[88px] leading-[1] tracking-[-0.05em]'>
							Get in
							<br />
							Touch
						</h1>
					</motion.div>

					{/* Right side - Form */}
					<motion.div className='flex-1 w-full' variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.25}>
						<ContactForm />
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default ContactHero;
