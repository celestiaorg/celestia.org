"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * AboutCTA — dark "Work with us" call-to-action (ported from prototype
 * .about-cta). Centered title + Open Roles / Get in Touch actions.
 */
const AboutCTA = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207]'>
			<div className='mx-auto max-w-[1520px] border-t border-white/[0.06] px-6 py-20 min-[600px]:px-[60px] min-[1200px]:px-[120px] min-[1200px]:py-[100px]'>
				<motion.div
					className='flex flex-col items-center gap-8 text-center'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={fadeUp}
				>
					<h2 className='font-slussenExtended text-[32px] font-medium leading-[1.1] tracking-[-0.025em] text-[#FDFCFF] min-[600px]:text-[42px]'>
						Work with us
					</h2>
					<div className='flex items-center gap-4'>
						<Button
							href='https://jobs.lever.co/celestia/'
							variant='pill-primary'
							size='pill-md'
						>
							Open roles
						</Button>
						<Button href='/contact/' variant='pill-outline' size='pill-md'>
							Get in touch
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutCTA;
