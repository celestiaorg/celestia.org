import { motion } from "framer-motion";

const BrandCells = () => {
	return (
		<section className="bg-[#040207] py-20 md:py-[110px]">
			<div className="mx-auto w-full max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
				<motion.div
					className="mb-10 max-w-[760px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
				>
					<motion.h2 className="font-slussenExtended font-medium text-[25px] min-[431px]:text-[28px] md:text-[42px] leading-[1.12] tracking-[-0.04em] text-[#FDFCFF] mb-[18px]">The Living System</motion.h2>
					<motion.p className="font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] mb-7">
						Cells are Celestia&apos;s generative visual language — flowing fields of particles that appear across the site, decks, and brand. Every cell is unique. Spin up your own below.
					</motion.p>
					<motion.a
						href="/cells/"
						target="_blank"
						rel="noopener"
						className="inline-flex items-center gap-2 font-slussen text-sm font-medium bg-white text-[#040207] rounded-full px-7 py-3 hover:opacity-75 active:scale-[0.98]"
					>
						Create your own cell ↗
					</motion.a>
				</motion.div>

				<div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-[#040207]">
					<span className="absolute top-[18px] left-[18px] inline-flex items-center gap-1.5 font-slussen text-[10px] tracking-[0.08em] uppercase text-white/70 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full pointer-events-none z-10">
						<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80]" />
						Live · interactive
					</span>
					<iframe src="/cells/" title="Celestia Cells — live generative system" className="w-full h-[460px] md:h-[620px] block border-0" loading="lazy" />
				</div>
			</div>
		</section>
	);
};

export default BrandCells;
