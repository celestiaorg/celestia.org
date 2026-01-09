"use client";

import Container from "@/components/Container/Container";
import ContactForm from "@/components/ContactForm/ContactForm";

const ContactHero = () => {
	return (
		<section data-header-theme='dark' className='relative min-h-screen lg:h-screen lg:max-h-[900px] bg-black overflow-hidden'>
			{/* Background image with lighten blend */}
			<div className='absolute inset-0 z-0'>
				<img
					src='/images/app/contact/contact-hero-new-image.png'
					alt=''
					className='absolute w-full h-full object-cover mix-blend-lighten opacity-80'
					style={{
						objectPosition: "center bottom",
					}}
				/>
			</div>

			{/* Content */}
			<Container size='lg' className='relative z-10 pt-40 pb-72 lg:pb-80'>
				<div className='flex flex-col lg:flex-row gap-16 lg:gap-24 items-start'>
					{/* Left side - Heading */}
					<div className='w-full lg:w-[340px] shrink-0'>
						<h1 className='font-untitledSans font-medium text-white text-6xl md:text-7xl lg:text-[88px] leading-[1] tracking-[-0.05em]'>
							Get in
							<br />
							Touch
						</h1>
					</div>

					{/* Right side - Form */}
					<div className='flex-1 w-full'>
						<ContactForm />
					</div>
				</div>
			</Container>
		</section>
	);
};

export default ContactHero;
