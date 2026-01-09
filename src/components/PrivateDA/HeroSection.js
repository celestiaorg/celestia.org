import Container from "@/components/Container/Container";
import PrimaryButtonNew from "@/macros/Buttons/PrimaryButtonNew";
import GhostButtonNew from "@/macros/Buttons/GhostButtonNew";

const HeroSection = () => {
	return (
		<section
			data-header-theme='light'
			className='relative h-screen sm:max-h-[800px] lg:max-h-[600px] xl:max-h-[800px] bg-white-weak overflow-hidden'
		>
			{/* Hero background image */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<img
					src='/images/app/private-da/private-da-hero-image.png'
					alt=''
					className='absolute bottom-0 right-0 max-sm:w-[170%] max-sm:max-w-[800px] max-sm:translate-x-[30%] sm:w-[750px] xl:w-[68%] h-auto max-w-[1200px] object-contain'
				/>
			</div>

			{/* Content */}
			<Container size='lg' className='relative z-10 flex flex-col justify-start lg:justify-center h-full pt-40 pb-20 lg:py-24'>
				<div className='max-w-xl lg:max-w-2xl'>
					{/* Title */}
					<h1 className='font-untitledSans font-medium text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1] tracking-[-0.05em] text-black mb-6'>
						Private
						<br />
						Blockspace
					</h1>

					{/* Subtitle */}
					<p className='font-untitledSans text-lg md:text-xl lg:text-2xl leading-[1.33] text-black mb-12'>
						Post privately. Prove publicly.
					</p>

					{/* Buttons */}
					<div className='flex flex-wrap items-center gap-4'>
						<PrimaryButtonNew href='#get-started' variant='purple'>
							Get Started
						</PrimaryButtonNew>
						<GhostButtonNew href='/new/contact/' variant='dark'>
							Talk to us
						</GhostButtonNew>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HeroSection;
