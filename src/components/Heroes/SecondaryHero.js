"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import { Body, Display, Label } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef } from "react";

const SecondaryHero = ({ title, subtitle, buttons, tableOfContents, videos }) => {
	const videoRef = useRef(null);
	const { isBannerVisible, bannerHeight } = useBanner();

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch((error) => {
				console.error("Video failed to play:", error);
			});
		}
	}, []);

	return (
		<section
			data-header-theme='light'
			style={
				isBannerVisible
					? {
							"--md-min-h": `calc(70vh + ${bannerHeight}px)`,
							"--lg-min-h": `calc(90vh + ${bannerHeight}px)`,
					  }
					: undefined
			}
			className={`bg-white-weak relative flex flex-col-reverse md:block border-b border-black
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

			<Container size={`lg`} className='relative z-10'>
				<div className={`${isBannerVisible ? "pt-64 lg:pt-72" : "pt-36 lg:pt-56"} lg:pb-20 flex flex-col lg:w-3/4 xl:w-2/3`}>
					<div className='flex row'>
						<div className={"w-3/4 lg:w-1/2"}>
							<Display size={"md"} className={`${subtitle ? "mb-3" : "mb-10"}`}>
								{title}
							</Display>
							{subtitle && (
								<Body size='md' className={"mb-10"}>
									{subtitle}
								</Body>
							)}
							{buttons?.length > 0 &&
								buttons.map((button, index) => (
									<BorderButton
										href={button.url}
										key={index}
										className='inline-flex clear-both w-full'
										iconDirection={button.iconDirection || "down-right"}
									>
										{button.text}
									</BorderButton>
								))}
							{tableOfContents && (
								<>
									<div className={"w-full md:mb-10"}>
										<Label tag={"h2"} size={"lg"} className={"mb-6"}>
											Table of Contents
										</Label>
										<div>
											{Object.entries(tableOfContents).map(([key, value], index) => {
												return (
													<TableButton key={index} href={value}>
														{key}
													</TableButton>
												);
											})}
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default SecondaryHero;

const TableButton = ({ children, href }) => {
	return (
		<Link href={href} className={`flex items-center group mb-2`}>
			<Body className={`mr-1`} size={"md"}>
				{children}
			</Body>
			<Icon
				border={false}
				transparentBg
				size={"xs"}
				Icon={<div className={"block h-4 w-4"}></div>}
				hover
				HoverIcon={<ArrowLongSVG dark />}
				direction={"down-right"}
			/>
		</Link>
	);
};
