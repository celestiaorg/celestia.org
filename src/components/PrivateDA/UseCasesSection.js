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

// Icons for the features section (from Figma design)
const ConfidentialIcon = ({ className = "" }) => (
	<svg width='80' height='59' viewBox='0 0 80 59' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
		<path
			d='M78.363 11.8584C79.0273 12.006 79.4997 12.5951 79.4998 13.2754V32.7666C79.4997 36.5146 77.627 40.0146 74.5085 42.0938L62.4353 50.1426L50.3621 42.0938C47.2434 40.0147 45.3699 36.5147 45.3699 32.7666V13.2754C45.37 12.5951 45.8425 12.006 46.5066 11.8584L62.4343 8.31836L78.363 11.8584Z'
			fill='url(#paint0_linear_conf)'
			stroke='url(#paint1_linear_conf)'
		/>
		<path
			d='M19.0166 0.5V12.21H30.7266V46.3408H19.0166V58.0508H12.21V46.3408H0.5V12.21H12.21V0.5H19.0166ZM7.30664 39.5332H23.9199V19.0166H7.30664V39.5332Z'
			fill='url(#paint2_linear_conf)'
			stroke='url(#paint3_linear_conf)'
		/>
		<defs>
			<linearGradient id='paint0_linear_conf' x1='62.435' y1='7.80664' x2='62.435' y2='25.0001' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
			<linearGradient id='paint1_linear_conf' x1='62.435' y1='7.80664' x2='62.435' y2='50.7437' gradientUnits='userSpaceOnUse'>
				<stop stopColor='white' stopOpacity='0.36' />
				<stop offset='1' stopColor='#17141A' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='paint2_linear_conf' x1='15.6135' y1='0' x2='15.6135' y2='35.5556' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
			<linearGradient id='paint3_linear_conf' x1='15.6135' y1='0' x2='15.6135' y2='58.5505' gradientUnits='userSpaceOnUse'>
				<stop stopColor='white' stopOpacity='0.36' />
				<stop offset='1' stopColor='#17141A' stopOpacity='0' />
			</linearGradient>
		</defs>
	</svg>
);

const VerifiableIcon = ({ className = "" }) => (
	<svg width='67' height='64' viewBox='0 0 67 64' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
		{/* Database cylinder */}
		<path
			d='M24.4453 12.231C31.1351 12.231 37.1671 13.5879 41.5078 15.7583C45.8783 17.9436 48.3915 20.8699 48.3916 23.9536V51.1157C48.3916 54.1996 45.8784 57.1257 41.5078 59.311C37.1671 61.4814 31.1351 62.8384 24.4453 62.8384C17.7558 62.8383 11.7244 61.4814 7.38379 59.311C3.01314 57.1257 0.500004 54.1996 0.5 51.1157V23.9536C0.500108 20.8699 3.01323 17.9436 7.38379 15.7583C11.7244 13.588 17.7558 12.231 24.4453 12.231ZM43.1963 44.7925C38.8142 47.5001 32.0596 49.2573 24.4453 49.2573C16.8312 49.2573 10.0772 47.5 5.69531 44.7925L4.93262 44.3218V51.1157C4.93262 51.7533 5.37482 52.4604 6.07324 53.1401C6.79625 53.8438 7.88211 54.6052 9.36621 55.3472C13.2107 57.2693 18.6227 58.4057 24.4453 58.4058C30.2681 58.4058 35.6807 57.2694 39.5254 55.3472C41.0095 54.6052 42.0953 53.8438 42.8184 53.1401C43.5167 52.4604 43.959 51.7533 43.959 51.1157V44.3218L43.1963 44.7925ZM43.1963 31.2114C38.8142 33.919 32.0596 35.6763 24.4453 35.6763C16.8312 35.6762 10.0772 33.919 5.69531 31.2114L4.93262 30.7407V37.5347C4.93262 38.1722 5.3748 38.8803 6.07324 39.5601C6.79625 40.2636 7.88239 41.0242 9.36621 41.7661C13.2107 43.6883 18.6227 44.8256 24.4453 44.8257C30.2681 44.8257 35.6807 43.6884 39.5254 41.7661C41.0093 41.0242 42.0953 40.2636 42.8184 39.5601C43.5168 38.8803 43.959 38.1722 43.959 37.5347V30.7407L43.1963 31.2114ZM24.4453 16.6636C18.6227 16.6636 13.2107 17.8 9.36621 19.7222C7.88215 20.4642 6.79625 21.2256 6.07324 21.9292C5.37487 22.6089 4.93271 23.3161 4.93262 23.9536C4.93262 24.5912 5.37479 25.2993 6.07324 25.979C6.79625 26.6825 7.88235 27.4431 9.36621 28.1851C13.2107 30.1072 18.6226 31.2446 24.4453 31.2446C30.2682 31.2446 35.6807 30.1073 39.5254 28.1851C41.0094 27.4431 42.0953 26.6826 42.8184 25.979C43.5168 25.2993 43.959 24.5912 43.959 23.9536C43.9589 23.3161 43.5167 22.6088 42.8184 21.9292C42.0953 21.2256 41.0095 20.4642 39.5254 19.7222C35.6807 17.7999 30.2681 16.6636 24.4453 16.6636Z'
			fill='url(#paint0_linear_verif)'
			stroke='url(#paint1_linear_verif)'
		/>
		{/* Badge background ring (creates separation from database) */}
		<circle cx='48' cy='16' r='17' fill='#17141a' />
		{/* Badge circle with gradient fill */}
		<circle cx='48' cy='16' r='11' fill='url(#paint2_linear_verif)' />
		{/* Checkmark */}
		<path d='M44.5 15L47 17.5L52.5 12L54 13.5L47 20.5L43 16.5L44.5 15Z' fill='#17141a' />
		<defs>
			<linearGradient id='paint0_linear_verif' x1='24.4457' y1='11.731' x2='24.4457' y2='43.0704' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
			<linearGradient id='paint1_linear_verif' x1='24.4457' y1='11.731' x2='24.4457' y2='63.3386' gradientUnits='userSpaceOnUse'>
				<stop stopColor='white' stopOpacity='0.36' />
				<stop offset='1' stopColor='#17141A' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='paint2_linear_verif' x1='47.8285' y1='5' x2='47.8285' y2='33.3429' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
		</defs>
	</svg>
);

const PerformanceIcon = ({ className = "" }) => (
	<svg width='72' height='52' viewBox='0 0 72 52' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
		<path
			d='M55.2419 21.4033H71.0447L51.5964 49.4961V29.6934H35.7937L55.2419 1.59961V21.4033Z'
			fill='url(#paint0_linear_perf)'
			stroke='url(#paint1_linear_perf)'
		/>
		<path
			d='M38.3223 44.1299H0V39.4844H38.3223V44.1299ZM25.5488 27.8711H0V23.2266H25.5488V27.8711ZM38.3223 11.6133H0V6.96777H38.3223V11.6133Z'
			fill='url(#paint2_linear_perf)'
		/>
		<defs>
			<linearGradient id='paint0_linear_perf' x1='53.4193' y1='0' x2='53.4193' y2='31.0292' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
			<linearGradient id='paint1_linear_perf' x1='53.4193' y1='0' x2='53.4193' y2='51.0968' gradientUnits='userSpaceOnUse'>
				<stop stopColor='white' stopOpacity='0.36' />
				<stop offset='1' stopColor='#17141A' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='paint2_linear_perf' x1='19.1613' y1='6.96826' x2='19.1613' y2='29.5349' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#D9BCFF' />
				<stop offset='1' stopColor='#C79CFF' />
			</linearGradient>
		</defs>
	</svg>
);

const features = [
	{
		icon: ConfidentialIcon,
		title: "Confidential by default",
		description: "Keep sensitive market data private: balances, positions, order sizes, counterparties, routing logic.",
	},
	{
		icon: VerifiableIcon,
		title: "Verifiable without decryption",
		description: "An anchor point provides verifiable claims on encrypted data without decrypting it.",
	},
	{
		icon: PerformanceIcon,
		title: "Built for performance",
		description: "Deliver millisecond-market UX while inheriting Celestia's scale and reliability.",
	},
];

const UseCasesSection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#17141a] text-white pt-16 md:pt-20 lg:pt-[80px] pb-12 sm:pb-[104px]'>
			{/* Run confidential markets section */}
			<Container size='lg'>
				<div className='flex flex-col gap-14 md:gap-14 lg:gap-14'>
					<div className='flex flex-col gap-6 md:gap-6'>
						<motion.h2
							className='font-untitledSans text-center font-medium text-[32px] md:text-[48px] lg:text-[64px] leading-[1] tracking-[-2px] text-white'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeUpVariants}
						>
							Run confidential markets without sacrificing accountability.
						</motion.h2>
						<motion.p
							className='font-untitledSans text-lg md:text-xl lg:text-2xl leading-[1.33] text-[#F5EDFE] text-center max-w-[980px] mx-auto'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-100px" }}
							variants={{
								hidden: { opacity: 0, y: 40 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.7,
										delay: 0.15,
										ease: [0.25, 0.4, 0.25, 1],
									},
								},
							}}
						>
							Keep balances, positions, and order flow private, while anyone can independently verify data availability and correctness.
						</motion.p>
					</div>

					{/* Features grid */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{features.map((feature, index) => (
							<motion.div
								key={index}
								className='flex flex-col items-center justify-between h-[280px] md:h-[320px] pt-[48px] pb-[32px] px-[32px] border border-[rgba(226,232,240,0.1)] rounded-[32px] bg-[linear-gradient(180deg,rgba(23,20,26,0)_0%,rgba(81,81,81,0.1)_100%)]'
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: "-50px" }}
								variants={{
									hidden: { opacity: 0, y: 40 },
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
							>
								<feature.icon />
								<div className='flex flex-col gap-4 text-center w-full'>
									<h3 className='font-untitledSans font-medium text-[24px] leading-[32px] tracking-[-1px] text-white'>
										{feature.title}
									</h3>
									<p className='font-untitledSans text-[16px] leading-[24px] text-[#f5edfe]'>{feature.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default UseCasesSection;
