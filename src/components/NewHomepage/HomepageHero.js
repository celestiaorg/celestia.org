"use client";

import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

// Hero headline component with specific styling from Figma
const HeroHeadline = ({ children }) => (
	<h1 className='font-untitledSans font-medium text-[48px] md:text-[64px] lg:text-[88px] leading-[1] tracking-[-0.05em] text-white'>
		{children}
	</h1>
);

// Hero subtitle component
const HeroSubtitle = ({ children }) => (
	<p className='font-untitledSans text-[18px] md:text-[20px] lg:text-[24px] leading-[1.33] text-[#b8b8b8] text-center max-w-[672px]'>
		{children}
	</p>
);

const HomepageHero = () => {
	return (
		<section data-header-theme='dark' className='relative h-screen max-h-[900px] bg-[#04070B] text-white overflow-hidden'>
			{/* Video background - absolutely positioned, shifted down, centered and max 1800px */}
			<div className='absolute inset-x-0 top-[50%] lg:top-[30%] xl:top-[20%] bottom-0 flex justify-center'>
				<video autoPlay loop muted playsInline className='w-full max-w-[1800px] h-full object-contain md:object-cover object-top'>
					<source src='/videos/home-hero-new.mp4' type='video/mp4' />
				</video>
			</div>

			{/* Content */}
			<Container size='lg' className='relative z-10 h-full'>
				<div className='flex flex-col items-center gap-10 pt-[180px] md:pt-[180px]'>
					{/* Text content */}
					<div className='flex flex-col items-center gap-8 sm:gap-2 text-center'>
						<HeroHeadline>Cut Ahead.</HeroHeadline>
						<HeroSubtitle>
							Celestia is the L1 for specialised onchain markets, enabling fibre optic performance with millisecond latency.
						</HeroSubtitle>
					</div>

					{/* CTA buttons */}
					<div className='flex flex-wrap items-center justify-center gap-4'>
						<PrimaryButton href='/build/' variant='purple' size='xl' noBorder>
							Start Building
						</PrimaryButton>
						<PrimaryButton href='/contact/' variant='ghost' size='xl' showArrow>
							Get in Touch
						</PrimaryButton>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HomepageHero;
