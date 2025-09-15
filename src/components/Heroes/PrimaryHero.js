"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Display } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/tw-merge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";

const PrimaryHero = ({ headline, subheadline, buttons, videos, headlineClassName }) => {
	const videoRef = useRef(null);
	const trackEvent = usePlausible();
	const { isBannerVisible, bannerHeight } = useBanner();
	const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
		rootMargin: "100px",
		threshold: 0.1,
		triggerOnce: false,
	});

	useEffect(() => {
		if (videoRef.current && isIntersecting) {
			videoRef.current.play().catch((error) => {
				// Handle error if playback fails
				console.error("Video failed to play:", error);
			});
		}
	}, [isIntersecting]);

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
			ref={sectionRef}
			style={
				isBannerVisible
					? {
							"--md-min-h": `calc(70vh + ${bannerHeight}px)`,
							"--lg-min-h": `calc(90vh + ${bannerHeight}px)`,
					  }
					: undefined
			}
			className={`bg-white-weak relative flex flex-col-reverse md:block content-center
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[90vh]"}
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[90vh]"}`}
		>
			{videos && isIntersecting && (
				<motion.video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className={
						"block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-full w-full md:object-cover md:z-0"
					}
				>
					<source src={videos.src.xl} type='video/mp4' media='(min-width: 1024px)' />
					<source src={videos.src.lg} type='video/mp4' media='(min-width: 768px)' />
					<source src={videos.src.sm} type='video/mp4' media='(max-width: 767px)' />
					{videos.poster.lg && <img src={videos.poster.lg} alt='' media='(min-width: 768px)' />}
					{videos.poster.sm && <img src={videos.poster.sm} alt='' media='(max-width: 767px)' />}
				</motion.video>
			)}
			<Container size={`lg`} className={`relative z-10 ${isBannerVisible ? "pt-64 lg:pt-28" : "pt-36 lg:pt-10"} lg:pb-10`}>
				<div className={`w-full md:w-3/4 lg:w-1/2 lg:pt-32 lg:my-auto`}>
					<Display size={"lg"} className={cn("mb-4", headlineClassName)}>
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
