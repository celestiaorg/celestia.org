"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Display } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import { useEffect, useRef } from "react";

const PrimaryHero = ({ headline, subheadline, buttons, videos }) => {
	const videoRef = useRef(null);
	const trackEvent = usePlausible();
	const { isBannerVisible, bannerHeight } = useBanner();

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch((error) => {
				// Handle error if playback fails
				console.error("Video failed to play:", error);
			});
		}
	}, []);

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
			className={`bg-white-weak relative flex flex-col-reverse md:block content-center
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[90vh]"}`}
		>
			{videos && (
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					className={
						"block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-full w-full md:object-cover md:z-0"
					}
				>
					<source src={videos.src.xl} type='video/mp4' media='(min-width: 1024px)' />
					<source src={videos.src.lg} type='video/mp4' media='(min-width: 768px)' />
					<source src={videos.src.sm} type='video/mp4' media='(max-width: 767px)' />
					{videos.poster.lg && <img src={videos.poster.lg} alt='' media='(min-width: 768px)' />}
					{videos.poster.sm && <img src={videos.poster.sm} alt='' media='(max-width: 767px)' />}
				</video>
			)}
			<Container size={`lg`} className={`relative z-10 ${isBannerVisible ? "pt-64 lg:pt-28" : "pt-36 lg:pt-10"} lg:pb-10`}>
				<div className={`w-full md:w-3/4 lg:w-1/2 lg:pt-32 lg:my-auto`}>
					<Display size={"lg"} className={`mb-4`}>
						{headline}
					</Display>
					<Body size={"lg"} className={`mb-8`}>
						{subheadline}
					</Body>
					<div className='w-10/12 gap-4 md:w-full md:flex md:flex-wrap lg:gap-10'>
						{buttons.map((button, index) => (
							<BorderButton
								key={index}
								onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								href={button.url}
								className='md:inline-flex'
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

export default PrimaryHero;
