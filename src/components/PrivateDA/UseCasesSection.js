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

// Icons for the features section
const ChartPieIcon = ({ className = "" }) => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M35.3501 26.4832C34.2898 28.9907 32.6314 31.2002 30.5199 32.9187C28.4084 34.6372 25.9081 35.8122 23.2375 36.3412C20.5669 36.8701 17.8075 36.7368 15.2003 35.9529C12.5932 35.1689 10.2178 33.7583 8.2818 31.8443C6.34579 29.9303 4.90813 27.5711 4.09449 24.9731C3.28086 22.3751 3.11604 19.6173 3.61443 16.9409C4.11283 14.2645 5.25926 11.7509 6.95351 9.61991C8.64776 7.48892 10.8382 5.8054 13.3334 4.71653M35.0001 19.9999C35.9201 19.9999 36.6751 19.2515 36.5834 18.3365C36.1992 14.5101 34.5035 10.9344 31.784 8.2154C29.0644 5.49644 25.4882 3.80159 21.6618 3.4182C20.7451 3.32653 19.9984 4.08153 19.9984 5.00153V18.3349C19.9984 18.7769 20.174 19.2008 20.4866 19.5134C20.7992 19.8259 21.2231 20.0015 21.6651 20.0015L35.0001 19.9999Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const ListTodoIcon = ({ className = "" }) => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M21.6667 8.33317H35M21.6667 19.9998H35M21.6667 31.6665H35M5 28.3332L8.33333 31.6665L15 24.9998M6.66667 6.6665H13.3333C14.2538 6.6665 15 7.4127 15 8.33317V14.9998C15 15.9203 14.2538 16.6665 13.3333 16.6665H6.66667C5.74619 16.6665 5 15.9203 5 14.9998V8.33317C5 7.4127 5.74619 6.6665 6.66667 6.6665Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const ImageUpscaleIcon = ({ className = "" }) => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M26.6667 5H35M35 5V13.3333M35 5L26.6667 13.3333M28.3333 35H31.6667C32.5507 35 33.3986 34.6488 34.0237 34.0237C34.6488 33.3986 35 32.5507 35 31.6667M35 20V25M5 11.6667V8.33333C5 7.44928 5.35119 6.60143 5.97631 5.97631C6.60143 5.35119 7.44928 5 8.33333 5M15 5H20M6.66667 18.3333H20C20.9205 18.3333 21.6667 19.0795 21.6667 20V33.3333C21.6667 34.2538 20.9205 35 20 35H6.66667C5.74619 35 5 34.2538 5 33.3333V20C5 19.0795 5.74619 18.3333 6.66667 18.3333Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

// Icons for the use cases section
const WalletIcon = ({ className = "" }) => (
	<svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M25.3889 20.0556H25.4067M7.61111 7.61111H28.9444C29.8874 7.61111 30.7918 7.98571 31.4586 8.65251C32.1254 9.3193 32.5 10.2237 32.5 11.1667V28.9444C32.5 29.8874 32.1254 30.7918 31.4586 31.4586C30.7918 32.1254 29.8874 32.5 28.9444 32.5H4.05556C3.11256 32.5 2.20819 32.1254 1.5414 31.4586C0.874602 30.7918 0.5 29.8874 0.5 28.9444V4.05556C0.5 3.11256 0.874602 2.20819 1.5414 1.5414C2.20819 0.874602 3.11256 0.5 4.05556 0.5H28.9444" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const BubblesIcon = ({ className = "" }) => (
	<svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M8.82 20.98C9.66869 20.98 10.4826 21.3171 11.0827 21.9173C11.6829 22.5174 12.02 23.3313 12.02 24.18M32.5 10.9C32.5 13.9928 29.9928 16.5 26.9 16.5C23.8072 16.5 21.3 13.9928 21.3 10.9C21.3 7.80721 23.8072 5.3 26.9 5.3C29.9928 5.3 32.5 7.80721 32.5 10.9ZM18.1 23.7C18.1 28.5601 14.1601 32.5 9.3 32.5C4.43989 32.5 0.5 28.5601 0.5 23.7C0.5 18.8399 4.43989 14.9 9.3 14.9C14.1601 14.9 18.1 18.8399 18.1 23.7ZM13.3 4.5C13.3 6.70914 11.5091 8.5 9.3 8.5C7.09086 8.5 5.3 6.70914 5.3 4.5C5.3 2.29086 7.09086 0.5 9.3 0.5C11.5091 0.5 13.3 2.29086 13.3 4.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const GlobeLockIcon = ({ className = "" }) => (
	<svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path d="M22.3976 21.3C21.5079 25.5078 19.466 29.3855 16.5 32.5C12.3916 28.1862 10.1 22.4572 10.1 16.5C10.1 10.5428 12.3916 4.81385 16.5 0.5C13.543 0.500771 10.644 1.32098 8.12495 2.86957C5.60586 4.41816 3.5652 6.63456 2.2295 9.2727C0.893804 11.9109 0.315318 14.8675 0.558267 17.8146C0.801215 20.7616 1.85609 23.5836 3.6058 25.9674C5.3555 28.3512 7.73157 30.2035 10.4703 31.3186C13.2089 32.4338 16.2031 32.7682 19.1203 32.2847C22.0375 31.8012 24.7637 30.5187 26.9962 28.5797C29.2286 26.6406 30.8801 24.1208 31.7672 21.3M0.5 16.5H14.1M29.3 6.9V3.7C29.3 2.85131 28.9629 2.03737 28.3627 1.43726C27.7626 0.837142 26.9487 0.5 26.1 0.5C25.2513 0.5 24.4374 0.837142 23.8373 1.43726C23.2371 2.03737 22.9 2.85131 22.9 3.7V6.9M21.3 6.9H30.9C31.7837 6.9 32.5 7.61635 32.5 8.5V13.3C32.5 14.1837 31.7837 14.9 30.9 14.9H21.3C20.4163 14.9 19.7 14.1837 19.7 13.3V8.5C19.7 7.61635 20.4163 6.9 21.3 6.9Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const features = [
	{
		icon: ChartPieIcon,
		title: "Confidential",
		description: "Selectively disclose sensitive data (e.g. user info, trading strategies)",
	},
	{
		icon: ListTodoIcon,
		title: "Verifiable",
		description: "Anchor Point provides verifiable claims on encrypted data without decrypting it.",
	},
	{
		icon: ImageUpscaleIcon,
		title: "Scalable",
		description: "Leverage Celestia's battle tested high throughput DA layer.",
	},
];

const useCases = [
	{
		icon: WalletIcon,
		title: "Private exchange",
		description: "Build an onchain exchange where balances, positions, and order sizes remain confidential.",
	},
	{
		icon: BubblesIcon,
		title: "Confidential payments",
		description: "Facilitate stablecoin payments where transfer details and counterparties remain private.",
	},
	{
		icon: GlobeLockIcon,
		title: "Confidential RWAs",
		description: "Tokenize funds, deposits, or debt without publicly revealing holder details.",
	},
];

const UseCasesSection = () => {
	return (
		<section data-header-theme="dark" className="bg-black text-white py-16 md:py-20 lg:py-[104px]">
			<Container size="lg">
				{/* About section */}
				<div className="flex flex-col gap-16 md:gap-20 lg:gap-[104px]">
					{/* Intro text */}
					<div className="flex flex-col gap-16 md:gap-20 lg:gap-[104px]">
						<motion.p
							className="font-untitledSans font-medium text-2xl md:text-3xl lg:text-4xl xl:text-[48px] xl:leading-[64px] leading-[1.33] tracking-[-0.04em] text-white"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeUpVariants}
						>
							Celestia's confidential blockspace lets applications publish encrypted data to Celestia—while still proving that the data is valid, available, and exactly what it claims to be.
						</motion.p>

						{/* Features grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-20">
							{features.map((feature, index) => (
								<motion.div
									key={index}
									className="flex flex-col gap-6 md:gap-8"
									initial="hidden"
									whileInView="visible"
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
									<feature.icon className="text-white" />
									<div className="flex flex-col gap-3 md:gap-4">
										<h3 className="font-untitledSans font-medium text-xl md:text-2xl lg:text-[28px] tracking-[-0.02em] text-white">
											{feature.title}
										</h3>
										<p className="font-untitledSans text-base leading-[1.5] text-[#d8cce5]">
											{feature.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Use cases section */}
					<div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
						<motion.h2
							className="font-untitledSans font-medium text-4xl md:text-5xl lg:text-[64px] leading-normal tracking-[-0.047em] text-white text-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeUpVariants}
						>
							Use cases
						</motion.h2>

						{/* Use cases grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-20">
							{useCases.map((useCase, index) => (
								<motion.div
									key={index}
									className="flex flex-col gap-6 md:gap-8"
									initial="hidden"
									whileInView="visible"
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
									<useCase.icon className="text-white" />
									<div className="flex flex-col gap-3 md:gap-4">
										<h3 className="font-untitledSans font-medium text-xl md:text-2xl lg:text-[28px] tracking-[-0.02em] text-white">
											{useCase.title}
										</h3>
										<p className="font-untitledSans text-base leading-[1.5] text-[#d8cce5]">
											{useCase.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default UseCasesSection;
