"use client";

import Container from "@/components/Container/Container";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef, useEffect, useState } from "react";

const AppCard = ({ title, description, image, url, chainIcon }) => (
	<div className='h-full transition-all duration-300 sm:px-3 xl:px-4 flex-shrink-0 w-full lg:w-1/3 pointer-events-auto'>
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 rounded-lg'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-lg'>
				<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex-1'>
					<div className='flex items-center justify-between gap-2 mb-2'>
						<h3 className='text-[26px] font-medium text-white font-youth'>{title}</h3>
						{chainIcon && (
							<div className='flex-shrink-0 w-[32px] h-[32px] overflow-hidden rounded-full'>
								<img
									src={chainIcon}
									alt='chain icon'
									className='object-cover w-full h-full pointer-events-none select-none'
									draggable='false'
								/>
							</div>
						)}
					</div>
					<p className='text-[16px]/5 text-white'>{description}</p>
				</div>
				<div className='pt-4'>
					<a
						href={url}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex text-white relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full'
					>
						<div className='inline-flex items-center justify-between w-full gap-2 group'>
							<span>Explore</span>
							<Icon
								Icon={<ArrowLongSVG dark />}
								hover
								HoverIcon={<ArrowLongSVG />}
								className='flex-grow-0'
								direction='up-right'
								border={false}
								size='xs'
								transparentBg
							/>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
);

const AppsCarousel = ({ items }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentTranslate, setCurrentTranslate] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Find index of first item with initialSlide: true (or default to 0)
	const INITIALSLIDEINDEX = items.findIndex((item) => item.initialSlide) ?? 0;

	// Duplicate items for infinite scroll
	const duplicatedItems = [...items, ...items, ...items];

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Set initial position based on initialSlide
	useEffect(() => {
		if (containerRef.current) {
			const containerWidth = containerRef.current.offsetWidth;
			// Account for gaps: on mobile we have gaps, on desktop we don't
			const slideWidth = isMobile ? containerWidth + 24 : containerWidth / 3; // 24px = gap-6
			const initialOffset = -(INITIALSLIDEINDEX * slideWidth + items.length * slideWidth);
			setCurrentTranslate(initialOffset);
		}
	}, [INITIALSLIDEINDEX, items.length, isMobile]);

	// Auto-scroll animation
	useEffect(() => {
		if (!isPlaying || !containerRef.current) return;

		let animationId;
		let lastTime = 0;
		const speed = 1; // pixels per frame at 60fps

		const animate = (currentTime) => {
			if (currentTime - lastTime >= 16) {
				// ~60fps
				setCurrentTranslate((prev) => {
					const containerWidth = containerRef.current?.offsetWidth || 0;
					// Account for gaps: on mobile we have gaps, on desktop we don't
					const slideWidth = isMobile ? containerWidth + 24 : containerWidth / 3; // 24px = gap-6

					const newTranslate = prev - speed;

					// Reset position when we've scrolled through one full set
					const resetPoint = -(items.length * slideWidth * 2);
					if (newTranslate <= resetPoint) {
						return -(items.length * slideWidth);
					}

					return newTranslate;
				});
				lastTime = currentTime;
			}

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationId);
	}, [isPlaying, items.length, isMobile]);

	return (
		<section className='pt-14 pb-16 md:py-20 bg-[#17141A] pr-0 md:pr-4'>
			<Container size='lg' className='relative overflow-hidden md:overflow-visible max-sm:px-0 max-w-[1680px]'>
				{/* Carousel */}
				<div ref={containerRef} className='relative mx-0 md:mx-[-40px] overflow-hidden px-3 md:px-0'>
					<div
						ref={trackRef}
						className='flex transition-transform duration-0 gap-6 md:gap-0 pointer-events-none'
						style={{
							transform: `translate3d(${currentTranslate}px, 0, 0)`,
							willChange: "transform",
							backfaceVisibility: "hidden",
							perspective: "1000px",
							transformStyle: "preserve-3d",
						}}
					>
						{duplicatedItems.map((item, index) => (
							<AppCard key={`${item.id}-${index}`} {...item} />
						))}
					</div>
				</div>

				<div className='mt-14 md:mt-[80px]'>
					<Display
						tag={"h2"}
						className={`text-center text-transparent bg-[linear-gradient(90deg,#7C2CF9_20%,#A777F6_50%,#D91CCB_80%)] bg-clip-text max-sm:max-w-[300px] mx-auto`}
						size={"sm"}
					>
						Celestia underneath
					</Display>
				</div>
			</Container>
		</section>
	);
};

export default AppsCarousel;
