"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Display } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import Image from "next/image";

const PrimaryHeroDark = ({ headline, subheadline, buttons, backgroundImage }) => {
	const trackEvent = usePlausible();
	const { isBannerVisible, bannerHeight } = useBanner();

	const handleButtonClick = (buttonText, url, trackEventName) => {
		if (!trackEventName) return;

		trackEvent(trackEventName, {
			props: {
				button: buttonText,
				url: url,
				location: "hero_section",
				path: window.location.pathname,
			},
		});
	};

	return (
		<section
			style={
				isBannerVisible
					? {
							"--md-min-h": `calc(70vh + ${bannerHeight}px)`,
							"--lg-min-h": `calc(90vh + ${bannerHeight}px)`,
					  }
					: undefined
			}
			className={`bg-[#17141A] relative flex flex-col-reverse md:block content-center
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[90vh]"}`}
		>
			<div className='z-10 block md:absolute md:top-0 md:left-0 md:h-full md:w-full md:z-0'>
				<Image src={backgroundImage} alt='Background' fill className='object-cover' priority />
			</div>
			<Container
				size={`lg`}
				className={`relative z-10 ${isBannerVisible ? "pt-64 lg:pt-24 pb-[480px] lg:pb-[450px]" : "pt-36 lg:pt-10 pb-96 lg:pb-[450px]"}`}
			>
				<div className={`w-full md:w-3/4 lg:w-full lg:pt-32 lg:my-auto`}>
					<Display size={"lg"} className={`mb-4 text-white max-w-[514px] max-sm:text-5xl`}>
						{headline}
					</Display>
					<Body size={"lg"} className={`mb-8 text-white`}>
						{subheadline}
					</Body>
					<div className='w-10/12 gap-4 md:w-full md:flex md:flex-wrap lg:gap-10'>
						{buttons.map((button, index) => (
							<BorderButton
								key={index}
								onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								href={button.url}
								className='text-white border-white md:inline-flex [&_path]:fill-white'
							>
								{button.text}
							</BorderButton>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PrimaryHeroDark;
