"use client";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import { Body, Heading } from "@/macros/Copy";
import { usePlausible } from "next-plausible";
import React, { useRef, useEffect, useState } from "react";

const MediaRow = ({ title, body, buttons, videoSrc, posterSrc, className, index }) => {
	const videoRight = index % 2 === 0 ? true : false;
	const trackEvent = usePlausible();
	const containerRef = useRef(null);
	const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);

	// Lazy load video when MediaRow is 200px from bottom of viewport
	useEffect(() => {
		const container = containerRef.current;
		if (!container || hasLoaded) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasLoaded) {
						setShouldLoadVideo(true);
						setHasLoaded(true);
					}
				});
			},
			{
				rootMargin: "0px 0px 200px 0px", // Trigger 200px before MediaRow enters viewport from bottom
				threshold: 0,
			}
		);

		observer.observe(container);

		return () => {
			observer.unobserve(container);
		};
	}, [hasLoaded]);

	const handleButtonClick = (buttonText, url, trackEventName) => {
		if (!trackEventName) return;

		trackEvent(trackEventName, {
			props: {
				button: buttonText,
				url: url,
				location: "media_row_section",
				path: window.location.pathname,
			},
		});
	};

	return (
		<div className={`${className}`} ref={containerRef}>
			<div className={"block relative w-full h-[100vw] overflow-hidden lg:w-1/2 lg:h-auto lg:overflow-visible"}>
				<div className={`lg:absolute lg:top-0 ${videoRight ? "lg:left-0" : "lg:right-0"} lg:h-full lg:w-[50vw]`}>
					<div className='h-full w-full absolute block top-0 left-0'>
						{shouldLoadVideo ? (
							<video
								autoPlay
								muted
								loop
								playsInline
								webkit-playsinline='true'
								preload='auto'
								poster={posterSrc}
								className='h-full w-full object-cover'
							>
								<source src={videoSrc} type='video/mp4' />
							</video>
						) : (
							<div className='h-full w-full bg-gray-200 flex items-center justify-center'>
								{/* Show poster image as placeholder until video loads */}
								{posterSrc && (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={posterSrc} alt={title} className='h-full w-full object-cover' draggable='false' />
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={"w-full lg:w-1/2 px-4 py-10 lg:py-24 xl:py-44 lg:px-20 xl:px-32"}>
				<div className={`w-full flex`}>
					<div className={"w-3/4 mb-8"}>
						<Heading size={"lg"} tag={"h2"}>
							{title}
						</Heading>
					</div>
					<div className={"w-1/4"}>
						<Body size='sm' className={"text-right"}></Body>
					</div>
				</div>
				<div className={"mb-8"}>
					{body.map((text, index) => {
						if (typeof text === "string") {
							return (
								<Body size={"md"} key={index} className={"mb-3 text-black-subtle"}>
									{text}
								</Body>
							);
						}
						// If it's a React element, render it with Body component using div tag
						return (
							<Body size={"md"} key={index} className={"mb-3 text-black-subtle"} tag='div'>
								{text}
							</Body>
						);
					})}
				</div>
				{buttons.map((button, index) => {
					return (
						<React.Fragment key={`button-${index}`}>
							{button.type === "primary" ? (
								<PrimaryButton
									href={button.url}
									className={"inline-block mr-3 mb-3 group"}
									lightMode
									noBorder={false}
									onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								>
									{button.text}
								</PrimaryButton>
							) : (
								<SecondaryButton
									href={button.url}
									className={"inline-block mr-3 mb-3 group"}
									lightMode={false}
									noBorder={false}
									onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								>
									{button.text}
								</SecondaryButton>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default MediaRow;
