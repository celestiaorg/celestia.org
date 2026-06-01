"use client";

import { motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import ContactForm from "@/components/ContactForm/ContactForm";

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
	}),
};

/**
 * ContactHero — light/frost "Get in touch" section (ported from prototype
 * .contact-page). Left: title, description and Open Roles / About Us actions.
 * Right: white form card.
 */
const ContactHero = () => {
	return (
		<section className='flex min-h-screen items-center bg-[#FDFCFF] px-6 pt-[140px] pb-[60px] min-[600px]:px-[60px] min-[600px]:pt-40 min-[600px]:pb-20 min-[1200px]:px-[120px] min-[1200px]:pt-[180px] min-[1200px]:pb-[100px]'>
			<div className='mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-12 min-[900px]:flex-row min-[900px]:gap-20'>
				{/* Left — title + description + actions */}
				<motion.div
					className='flex max-w-full shrink-0 flex-col items-start min-[900px]:max-w-[480px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
				>
					<motion.h1
						className='mb-6 font-slussenExtended text-[42px] font-medium leading-[1.1] tracking-[-0.04em] text-[#1a1a1a] min-[900px]:text-[56px] min-[1200px]:text-[72px]'
						variants={fadeUp}
					>
						Get in touch
					</motion.h1>
					<motion.p
						className='mb-8 font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'
						variants={fadeUp}
						custom={0.1}
					>
						We are a full-stack partner. We design and build a chain from first principles for your specific traffic profile and application needs, then hand it to you production-ready. You own the infrastructure and the economics.
					</motion.p>
					<motion.div
						className='flex items-center gap-3'
						variants={fadeUp}
						custom={0.2}
					>
						<Link
							href='https://jobs.lever.co/celestia/'
							className='rounded-full border border-[#1a1a1a] bg-[#1a1a1a] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity hover:opacity-85'
						>
							Open Roles
						</Link>
						<Link
							href='/about/'
							className='rounded-full border border-black/20 bg-transparent px-6 py-2.5 font-slussen text-[14px] font-medium text-[#1a1a1a] no-underline transition-colors hover:border-black/50'
						>
							About Us
						</Link>
					</motion.div>
				</motion.div>

				{/* Right — form card */}
				<motion.div
					className='w-full max-w-full flex-1 rounded-lg border border-black/[0.08] bg-white p-8 min-[600px]:p-9 min-[900px]:max-w-[560px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
					variants={fadeUp}
					custom={0.15}
				>
					<ContactForm />
				</motion.div>
			</div>
		</section>
	);
};

export default ContactHero;
