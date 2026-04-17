"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

const FibreZone = () => {
	return (
		<div className='relative z-[2] bg-[#050208] flex justify-center items-center pt-4 pb-10'>
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Button
					href='https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/'
					variant='pill-primary'
					size='pill-md'
				>
					<span>Learn More About Fibre</span>
					<ArrowRightSVG className='opacity-40' />
				</Button>
			</motion.div>
		</div>
	);
};

export default FibreZone;
