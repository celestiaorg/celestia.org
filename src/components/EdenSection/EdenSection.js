"use client";
import InverseButton from "@/macros/Buttons/InverseButton";
import { Body } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import { cn } from "@/utils/tw-merge";

const EdenSection = ({ headline, subheadline, buttons, backgroundImage, className }) => {
	const trackEvent = usePlausible();

	const handleButtonClick = (buttonText, url, trackEventName) => {
		if (!trackEventName) return;

		trackEvent(trackEventName, {
			props: {
				button: buttonText,
				url: url,
				location: "eden_section",
				path: window.location.pathname,
			},
		});
	};

	return (
		<section className={cn("relative bg-white-weak py-[100px] lg:py-[80px]", className)}>
			{backgroundImage && (
				<>
					{/* Mobile background */}
					<div
						className='absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden'
						style={{
							backgroundImage: `url(/images/app/homepage/eden-bg-mobile.jpg)`,
						}}
					/>
					{/* Desktop background */}
					<div
						className='absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block'
						style={{
							backgroundImage: `url(${backgroundImage})`,
						}}
					/>
				</>
			)}
			<div className='relative z-10'>
				<div className='px-4 py-16 text-center'>
					<div className='max-w-[500px] mx-auto'>
						<div className='mb-1 sm:mb-5 flex justify-center'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/homepage/celestia_eden.svg'
								alt='Celestia Eden'
								width='198'
								height='36'
								className='w-[80px] sm:w-[100px] h-auto'
							/>
						</div>
						<h1 className='text-[3.5rem] leading-[0.95] tracking-normal lg:text-[5.125rem] lg:leading-[1] text-pretty mb-6 font-leagueSpartan'>
							{headline}
						</h1>
						<Body size='md' className='mb-6 sm:mb-8 mx-auto'>
							{subheadline}
						</Body>
						{buttons && buttons.length > 0 && (
							<div className='flex flex-row gap-4 justify-center'>
								{buttons.map((button, index) => (
									<InverseButton
										key={index}
										onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
										href={button.url}
										className='inline-flex'
										lightMode={true}
										size='lg'
									>
										{button.text}
									</InverseButton>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default EdenSection;
