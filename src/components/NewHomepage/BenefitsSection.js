"use client";

import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

// Benefit card component with alternating image/text layout
const BenefitCard = ({ title, description, imageSrc, imageAlt, imagePosition = "right" }) => {
	const imageOrderClass = imagePosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = imagePosition === "left" ? "order-2" : "order-2 md:order-1";

	return (
		<div className='flex flex-col md:flex-row items-stretch border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden'>
			<div className={`relative w-full md:w-1/2 h-[280px] md:h-[400px] ${imageOrderClass}`}>
				<img
					src={imageSrc}
					alt={imageAlt}
					className='absolute inset-0 w-full h-full object-cover mix-blend-lighten'
				/>
			</div>
			<div className={`flex flex-col gap-4 justify-center w-full md:w-1/2 px-6 py-8 md:px-[80px] md:py-0 ${textOrderClass}`}>
				<h3 className='font-untitledSans font-medium text-[28px] md:text-[40px] leading-tight tracking-[-0.05em] text-white'>
					{title}
				</h3>
				<p className='font-untitledSans text-[16px] md:text-[20px] leading-[1.35] text-[#dedede]'>
					{description}
				</p>
			</div>
		</div>
	);
};

const BenefitsSection = () => {
	const benefits = [
		{
			title: "Low-latency",
			description:
				"Reach millisecond latency with Celestia underneath. Celestia powers dedicated networks to achieve fibre optic pace for onchain markets.",
			imageSrc: "/images/app/homepage/benefits-low-latency.png",
			imageAlt: "Low-latency visualization",
			imagePosition: "right",
		},
		{
			title: "Specialisation",
			description:
				"With Celestia, markets are purpose-built: custom execution, fees, privacy, and matching logic optimised for their asset, participants, and latency needs, without generic constraints.",
			imageSrc: "/images/app/homepage/benefits-specialisation.png",
			imageAlt: "Specialisation visualization",
			imagePosition: "left",
		},
		{
			title: "High-volume",
			description:
				"Celestia's high-bandwidth blockspace enables markets that can scale to any size to support demand from users in every corner of the world.",
			imageSrc: "/images/app/homepage/benefits-high-volume.png",
			imageAlt: "High-volume visualization",
			imagePosition: "right",
		},
	];

	return (
		<section data-header-theme='dark' className='bg-[#17141A] py-[80px] md:py-[144px]'>
			<Container size='lg'>
				<div className='flex flex-col gap-[64px] md:gap-[96px]'>
					{/* Header */}
					<div className='flex flex-col gap-6 items-center text-center'>
						<h2 className='font-untitledSans font-medium text-[32px] md:text-[40px] lg:text-[48px] leading-[1.17] tracking-[-0.04em] text-white max-w-[900px]'>
							Celestia's terabit-scale blockspace provides the properties that allow markets to cut ahead of
							the rest.
						</h2>
						<PrimaryButton href='/learn/' variant='ghost' size='xl' className='border border-white rounded-full'>
							Learn more about Fibre
						</PrimaryButton>
					</div>

					{/* Benefit cards */}
					<div className='flex flex-col gap-8 md:gap-12'>
						{benefits.map((benefit, index) => (
							<BenefitCard
								key={index}
								title={benefit.title}
								description={benefit.description}
								imageSrc={benefit.imageSrc}
								imageAlt={benefit.imageAlt}
								imagePosition={benefit.imagePosition}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BenefitsSection;
