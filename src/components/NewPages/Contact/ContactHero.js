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
		<section className='flex min-h-screen items-start bg-[#FDFCFF] px-6 pt-[116px] pb-[60px] min-[601px]:pt-40 min-[601px]:pb-20 min-[769px]:px-[60px] min-[1201px]:px-[120px] min-[1201px]:pt-[clamp(150px,24vh,260px)] min-[1201px]:pb-[clamp(48px,8vh,100px)]'>
			{/* Freeze: content caps at 1280px on wide screens, extra space becomes padding */}
			<div className='mx-auto flex w-full max-w-[1280px] flex-row items-start justify-between gap-20 max-[1200px]:gap-[60px] max-[900px]:flex-col'>
				{/* Left — title + description + actions */}
				<motion.div
					className='flex max-w-full shrink-0 flex-col items-start min-[901px]:max-w-[480px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
				>
					<motion.h1
						className='mb-5 font-slussenExtended text-[32px] font-medium leading-[1.12] tracking-[-0.04em] text-[#0E1014] min-[431px]:text-[36px] min-[769px]:text-[56px] min-[769px]:leading-[1.1] min-[901px]:text-[72px]'
						variants={fadeUp}
					>
						Get in touch
					</motion.h1>
					<motion.p
						className='mb-8 font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058] min-[769px]:text-[18px]'
						variants={fadeUp}
						custom={0.1}
					>
						We are a full-stack partner. We design and build a chain from first principles for your specific traffic profile and application needs, then hand it to you production-ready. You own the infrastructure and the economics.
					</motion.p>
					<motion.div
						className='flex flex-wrap items-center gap-3'
						variants={fadeUp}
						custom={0.2}
					>
						<Link
							href='https://jobs.lever.co/celestia/'
							className='rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity hover:opacity-85'
						>
							Open roles
						</Link>
						<Link
							href='/about/'
							className='rounded-full border border-black/20 bg-transparent px-6 py-2.5 font-slussen text-[14px] font-medium text-[#0E1014] no-underline transition-colors hover:border-black/50'
						>
							About us
						</Link>
					</motion.div>
				</motion.div>

				{/* Right — form card */}
				<motion.div
					className='w-full max-w-full flex-1 rounded-lg border border-black/[0.08] bg-white px-6 py-8 min-[601px]:px-9 min-[601px]:py-10 min-[901px]:max-w-[560px]'
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
