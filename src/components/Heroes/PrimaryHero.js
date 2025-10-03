"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Display } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/tw-merge";

const PrimaryHero = ({ headline, subheadline, buttons, videos, headlineClassName }) => {
	const videoRef = useRef(null);
	const trackEvent = usePlausible();
	const { isBannerVisible, bannerHeight } = useBanner();
	const [isVideoVisible, setIsVideoVisible] = useState(false);

	// Callback ref to try playing video immediately when ref is set
	const setVideoRef = (node) => {
		videoRef.current = node;
		if (node) {
			// Try to play immediately when ref is set
			setTimeout(() => {
				node.play().catch(() => {});
			}, 100);
		}
	};

	useEffect(() => {
		setIsVideoVisible(true);

		// Try to play video immediately when component mounts
		if (videoRef.current) {
			const video = videoRef.current;
			// Try multiple times with increasing delays
			const tryPlay = (attempt = 0) => {
				video.play().catch(() => {
					if (attempt < 5) {
						setTimeout(() => tryPlay(attempt + 1), 200 * (attempt + 1));
					}
				});
			};
			tryPlay();
		}
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			const video = videoRef.current;

			const handleCanPlay = () => {
				// Force autoplay immediately
				video.play().catch((error) => {
					// If autoplay fails, try again after a short delay
					setTimeout(() => {
						video.play().catch(() => {
							// Final attempt - if still fails, log for debugging
							console.log("Video autoplay failed:", error.name);
						});
					}, 100);
				});
			};

			// If video is already loaded, play immediately
			if (video.readyState >= 3) {
				handleCanPlay();
			} else {
				// Wait for video to be loaded enough to play
				video.addEventListener("canplay", handleCanPlay);
			}

			// Also try on loadeddata for Safari
			video.addEventListener("loadeddata", handleCanPlay);

			// Cleanup
			return () => {
				video.removeEventListener("canplay", handleCanPlay);
				video.removeEventListener("loadeddata", handleCanPlay);
			};
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
							"--lg-min-h": `calc(100vh + ${bannerHeight}px)`,
					  }
					: undefined
			}
			className={`bg-white-weak relative flex flex-col-reverse md:block content-center
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[100vh]"}
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[70vh] lg:min-h-[100vh]"}`}
		>
			{videos && (
				<video
					ref={setVideoRef}
					muted
					loop
					playsInline
					webkit-playsinline='true'
					autoPlay
					preload='auto'
					poster={videos.poster?.lg || videos.poster?.sm}
					onLoadedData={() => {
						// Try to play as soon as data is loaded
						if (videoRef.current) {
							videoRef.current.play().catch(() => {});
						}
					}}
					onCanPlay={() => {
						// Try to play when video can play
						if (videoRef.current) {
							videoRef.current.play().catch(() => {});
						}
					}}
					className={cn(
						"block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-full w-full md:object-cover md:z-0",
						"transition-opacity duration-1000 ease-in-out",
						isVideoVisible ? "opacity-100" : "opacity-0"
					)}
				>
					<source src={videos.src.xl} type='video/mp4' media='(min-width: 1024px)' />
					<source src={videos.src.lg} type='video/mp4' media='(min-width: 768px)' />
					<source src={videos.src.sm} type='video/mp4' media='(max-width: 767px)' />
				</video>
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
