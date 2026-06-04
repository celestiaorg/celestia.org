"use client";

import { motion } from "framer-motion";
import AnimatedHeadline from "@/components/NewHomepage/AnimatedHeadline";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * BwuProse — "The Build-vs-Buy Gap" (prototype .bwu-prose).
 * Light section: left-aligned section headline, then a two-column body —
 * 18px muted prose on the left, 24px dark lead sentence on the right.
 */
const BwuProse = () => {
	return (
		<section data-header-theme='light' className='bg-[#FDFCFF]'>
			<div className='mx-auto flex max-w-[1520px] flex-col items-start gap-8 px-6 py-12 min-[680px]:px-[60px] min-[680px]:py-[60px] min-[1200px]:px-[120px] min-[1200px]:py-20'>
				<AnimatedHeadline text='The Build-vs-Buy Gap' align='left' />
				<motion.div
					className='flex w-full flex-col gap-6 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-20'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={fadeUp}
				>
					<p className='flex-1 font-slussen text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-[#4A5058] min-[680px]:text-[18px]'>
						Enterprises with serious traffic face a difficult choice today. Building a chain in-house takes 18 to 24 months and requires deep infrastructure expertise most companies do not have. Building on a shared chain moves faster but forces you to compete with every other tenant for blockspace and to accept a roadmap controlled by someone else.
					</p>
					<p className='flex-1 font-slussen text-[18px] font-normal leading-[1.6] tracking-[-0.01em] text-[#0E1014] min-[680px]:text-[24px]'>
						Celestia is the third path. We design and ship a high-throughput custom chain sized to your business, in months. The infrastructure and the roadmap are yours from day one.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default BwuProse;
