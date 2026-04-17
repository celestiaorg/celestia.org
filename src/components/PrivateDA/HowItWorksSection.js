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

const HowItWorksSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-black-pure border-t border-white/[0.05] px-5 py-16 md:px-12 md:py-[100px] lg:px-[86px] lg:py-[120px]'
		>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start'>
				{/* Left: text */}
				<motion.div
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					custom={0.12}
				>
					<h2 className='font-slussenExtended font-medium text-[32px] leading-[1.15] tracking-[-1.5px] md:text-[42px] md:tracking-[-2.2px] text-white/90 mb-7'>
						How it works
					</h2>
					<p className='font-slussenExtended font-normal text-[17px] leading-[1.6] tracking-[-0.5px] text-white/70 mb-4'>
						Operators publish verifiably encrypted state to Celestia via the Private Blockspace proxy.
					</p>
					<p className='font-slussen text-[15px] leading-[1.7] tracking-[-0.1px] text-white/45'>
						The encrypted data is publicly available, and a public commitment anchors it to the
						protocol&apos;s onchain state, allowing anyone to verify availability and consistency without
						revealing the underlying data.
					</p>
					<p className='font-slussen text-[15px] leading-[1.7] tracking-[-0.1px] text-white/45 mt-4'>
						Disclosure and key management are defined by the operator. For more detail, read the docs here.
					</p>
					<div className='mt-8'>
						<Button
							href='https://docs.celestia.org/build/private-blockspace/about/'
							variant='pill-outline'
							size='pill-md'
						>
							Read Docs <span>→</span>
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
					<div className='w-full overflow-x-auto'>
						<table className='w-full border-collapse table-fixed'>
							<colgroup>
								<col className='w-[44%]' />
								<col className='w-[18%]' />
								<col className='w-[18%]' />
								<col className='w-[20%]' />
							</colgroup>
							<thead>
								<tr>
									<th className='text-left pt-4 pb-[18px] px-0 border-b border-white/[0.08] font-slussen font-medium uppercase text-[11px] tracking-[0.6px] text-white/35 leading-[1.4]' />
									<th className='text-center pt-4 pb-[18px] px-1 border-b border-r border-white/[0.08] border-r-white/[0.06] font-slussen font-medium uppercase text-[8px] md:text-[11px] tracking-[0.4px] md:tracking-[0.6px] text-white/35 leading-[1.4]'>
										Private
										<br />
										Markets
									</th>
									<th className='text-center pt-4 pb-[18px] px-1 border-b border-r border-white/[0.08] border-r-white/[0.06] font-slussen font-medium uppercase text-[8px] md:text-[11px] tracking-[0.4px] md:tracking-[0.6px] text-white/35 leading-[1.4]'>
										Public
										<br />
										Markets
									</th>
									<th
										className='text-center pt-4 pb-[18px] px-1 border-b border-white/[0.08] font-slussen font-medium uppercase text-[8px] md:text-[11px] tracking-[0.4px] md:tracking-[0.6px] text-white/90 leading-[1.4]'
										style={{ background: "rgba(130,100,240,0.10)", borderLeft: highlightBorder, borderRight: highlightBorder }}
									>
										Private
										<br />
										Blockspace
									</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((row, rowIndex) => (
									<tr key={row.label}>
										<td className='text-left py-3 md:py-4 pl-3 pr-2 md:pl-5 md:pr-5 border-b border-white/[0.06] font-slussenMono text-[11px] md:text-[13px] leading-[1.5] text-white/75'>
											{row.label}
										</td>
										<td className='text-center align-middle py-3 md:py-4 px-1 border-b border-r border-white/[0.06] border-r-white/[0.06] leading-none'>
											{row.cells[0]}
										</td>
										<td className='text-center align-middle py-3 md:py-4 px-1 border-b border-r border-white/[0.06] border-r-white/[0.06] leading-none'>
											{row.cells[1]}
										</td>
										<td
											className='text-center align-middle py-3 md:py-4 px-1 border-b border-white/[0.06] leading-none'
											style={{
												background: `rgba(130,100,240,${0.08 - rowIndex * 0.014})`,
												borderLeft: highlightBorder,
												borderRight: highlightBorder,
											}}
										>
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
