import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

const BuildHero = () => {
	return (
		<section
			data-header-theme='dark'
			className='relative h-screen md:max-h-[900px] bg-[#17141A] text-white flex items-end pb-48 md:pb-64 lg:pb-80 overflow-hidden'
		>
			{/* Background image with mix-blend-lighten */}
			<div className='absolute inset-0 pointer-events-none'>
				<div
					className='absolute inset-0 mix-blend-lighten bg-no-repeat bg-cover bg-[45%_center] md:bg-center'
					style={{
						backgroundImage: "url('/images/app/build/build-hero-new-image.png')",
					}}
				/>
			</div>

			{/* Content */}
			<Container size='lg' className='relative z-10'>
				<div className='flex flex-col gap-6 md:gap-8'>
					{/* Heading */}
					<h1 className='font-untitledSans font-medium text-[48px] md:text-[72px] lg:text-[88px] leading-[1] tracking-[-3px] md:tracking-[-4px] lg:tracking-[-5px] text-white'>
						Get
						<br />
						started
					</h1>

					{/* Button group */}
					<div className='flex flex-wrap gap-2 md:gap-4 items-center'>
						<PrimaryButton href='#build-custom' variant='purple' size='xl'>
							Build Custom
						</PrimaryButton>
						<PrimaryButton href='#build-framework' variant='ghost' size='xl' showArrow>
							Build on a Framework
						</PrimaryButton>
						<PrimaryButton href='#deploy' variant='ghost' size='xl' showArrow>
							Deploy
						</PrimaryButton>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BuildHero;
