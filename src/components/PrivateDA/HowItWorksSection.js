"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const Check = ({ strong = false }) => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='inline-block align-middle'>
		<path
			d='M3 8L6.5 11.5L13 4.5'
			stroke={strong ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
			strokeWidth='1.75'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const Cross = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='inline-block align-middle'>
		<path
			d='M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5'
			stroke='rgba(255,255,255,0.2)'
			strokeWidth='1.75'
			strokeLinecap='round'
		/>
	</svg>
);

const Warn = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='inline-block align-middle'>
		<circle cx='8' cy='8' r='5.5' stroke='rgba(255,255,255,0.35)' strokeWidth='1.5' />
		<path d='M8 5.5V8.5' stroke='rgba(255,255,255,0.35)' strokeWidth='1.5' strokeLinecap='round' />
		<circle cx='8' cy='10.5' r='0.75' fill='rgba(255,255,255,0.35)' />
	</svg>
);

const rows = [
	{ label: "Confidential execution", cells: [<Check key='c1' />, <Cross key='c2' />, <Check key='c3' strong />] },
	{ label: "Public availability guarantees", cells: [<Cross key='c1' />, <Check key='c2' />, <Check key='c3' strong />] },
	{ label: "Reduced operator trust", cells: [<Cross key='c1' />, <Check key='c2' />, <Check key='c3' strong />] },
	{ label: "Auditability without disclosure", cells: [<Cross key='c1' />, <Cross key='c2' />, <Check key='c3' strong />] },
	{ label: "Credible recovery paths", cells: [<Cross key='c1' />, <Warn key='c2' />, <Check key='c3' strong />] },
];

const highlightBorder = "1px solid rgba(130,100,240,0.12)";
const highlightGradient =
	"linear-gradient(to bottom, rgba(130,100,240,0.18) 0%, rgba(130,100,240,0.03) 65%, transparent 100%)";

const HowItWorksSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-black-pure border-t border-white/[0.05] px-6 py-16 min-[600px]:px-[60px] md:py-[100px] min-[1200px]:px-[120px] lg:py-[120px]'
		>
			<div className='mx-auto grid w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start'>
				{/* Left: text */}
				<motion.div
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					custom={0.12}
				>
					<h2 className='font-slussenExtended font-medium text-[25px] min-[431px]:text-[28px] leading-[1.2] tracking-[-0.025em] md:text-[40px] md:leading-[1.1] md:tracking-[-0.025em] text-white/90 mb-7'>
						How It Works
					</h2>
					<p className='font-slussen text-[17px] min-[431px]:text-[18px] leading-[1.4] tracking-[0] md:text-[24px] md:leading-[1.25] md:tracking-[-0.025em] font-medium text-white/[0.92] mb-4'>
						Operators publish verifiably encrypted state to Celestia via the Private Blockspace proxy.
					</p>
					<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72]'>
						The encrypted data is publicly available, and a public commitment anchors it to the
						protocol&apos;s onchain state, allowing anyone to verify availability and consistency without
						revealing the underlying data.
					</p>
					<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] mt-4'>
						Disclosure and key management are defined by the operator. For more detail, read the docs here.
					</p>
					<div className='mt-8'>
						<Button
							href='https://docs.celestia.org/build/private-blockspace/about/'
							variant='pill-outline'
							size='pill-md'
						>
							Read docs <span>→</span>
						</Button>
					</div>
				</motion.div>

				{/* Right: comparison table */}
				<motion.div
					className='relative w-full'
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
				>
					<div className='relative w-full overflow-x-auto max-md:overflow-visible'>
						{/* Single continuous gradient for the Private Blockspace column */}
						<div
							className='pointer-events-none absolute top-0 bottom-0 right-0 z-0 w-[23%] md:w-[20%]'
							style={{
								background: highlightGradient,
								borderLeft: highlightBorder,
								borderRight: highlightBorder,
							}}
							aria-hidden='true'
						/>
						<table className='relative z-[1] w-full border-collapse table-fixed'>
							<colgroup>
								<col className='max-md:w-[31%]' />
								<col className='w-[23%] md:w-[18%]' />
								<col className='w-[23%] md:w-[18%]' />
								<col className='w-[23%] md:w-[20%]' />
							</colgroup>
							<thead>
								<tr>
									<th className='text-left pt-4 pb-[18px] px-0 border-b border-white/[0.08] font-slussen font-medium text-[11px] md:text-[16px] tracking-[0.6px] md:tracking-[-0.01em] text-white/35 leading-[1.4]' />
									<th className='text-center pt-4 pb-[18px] px-1 border-b border-r border-white/[0.08] border-r-white/[0.06] font-slussen font-medium text-[11px] md:text-[16px] tracking-[0.4px] md:tracking-[-0.01em] text-white/35 leading-[1.4]'>
										Private
										<br />
										Markets
									</th>
									<th className='text-center pt-4 pb-[18px] px-1 border-b border-r border-white/[0.08] border-r-white/[0.06] font-slussen font-medium text-[11px] md:text-[16px] tracking-[0.4px] md:tracking-[-0.01em] text-white/35 leading-[1.4]'>
										Public
										<br />
										Markets
									</th>
									<th className='relative bg-transparent text-center pt-4 pb-[18px] px-1 border-b border-white/[0.08] font-slussen font-medium text-[11px] md:text-[16px] tracking-[0.4px] md:tracking-[-0.01em] text-white/90 leading-[1.4]'>
										Private
										<br />
										Blockspace
									</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((row, rowIndex) => (
									<tr key={row.label}>
										<td className='text-left py-3 md:py-4 pl-3 pr-2 md:pl-5 md:pr-5 border-b border-white/[0.06] font-slussen text-[11px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72]'>
											{row.label}
										</td>
										<td className='text-center align-middle py-3 md:py-4 px-1 border-b border-r border-white/[0.06] border-r-white/[0.06] leading-none'>
											{row.cells[0]}
										</td>
										<td className='text-center align-middle py-3 md:py-4 px-1 border-b border-r border-white/[0.06] border-r-white/[0.06] leading-none'>
											{row.cells[1]}
										</td>
										<td className='relative bg-transparent text-center align-middle py-3 md:py-4 px-1 border-b border-white/[0.06] leading-none'>
											{row.cells[2]}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HowItWorksSection;
