"use client";

import Container from "@/components/Container/Container";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

const AppCard = ({ title, description, image, url, chainIcon, videoUrl, mobileVideoUrl, poster, mobilePoster, onMediaHover }) => {
	const [isHovered, setIsHovered] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			const video = videoRef.current;

			const handleCanPlay = () => {
				video.play().catch((error) => {
					console.error("Video failed to play:", error);
				});
			};

			// If video is already loaded, play immediately
			if (video.readyState >= 3) {
				handleCanPlay();
			} else {
				// Wait for video to be loaded enough to play
				video.addEventListener("canplay", handleCanPlay);
			}

			// Cleanup
			return () => {
				video.removeEventListener("canplay", handleCanPlay);
			};
		}
	}, []);

	const handleMouseEnter = () => {
		setIsHovered(true);
		onMediaHover(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		onMediaHover(false);
	};

	return (
		<div className='h-full transition-all duration-300 sm:px-3 xl:px-4 flex-shrink-0 w-full lg:w-1/3 max-w-[480px] pointer-events-auto'>
			<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 rounded-lg p-1 relative'>
				{/* Hover background overlay */}
				<div
					className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
					style={{
						background: "linear-gradient(to bottom, rgba(255,255,255,0.1) 10%, transparent)",
					}}
				/>
				<div
					className='w-full aspect-[400/240] overflow-hidden rounded-lg relative z-10 shadow-lg'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{videoUrl ? (
						<video
							ref={videoRef}
							muted
							loop
							playsInline
							preload='auto'
							poster={poster || mobilePoster}
							className='object-cover w-full h-full pointer-events-none select-none'
						>
							<source src={videoUrl} type='video/mp4' media='(min-width: 768px)' />
							<source src={mobileVideoUrl || videoUrl} type='video/mp4' media='(max-width: 767px)' />
						</video>
					) : (
						<>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
						</>
					)}
				</div>

				<div className='flex flex-col flex-1 p-6 relative z-10'>
					<div className='flex-1'>
						<div className='flex items-center justify-between gap-2 mb-2'>
							<h3 className='text-[26px] font-medium text-white font-youth'>{title}</h3>
							{chainIcon && (
								<div className='flex-shrink-0 w-[32px] h-[32px] overflow-hidden rounded-full'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
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
};

const AppsCarousel = ({ items }) => {
	const containerRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// Framer Motion values
	const x = useMotionValue(0);
	const xTransform = useTransform(x, (value) => `${value}px`);

	// Duplicate items for infinite scroll - use more copies for seamless loop
	const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Set initial position
	useEffect(() => {
		if (containerRef.current) {
			const containerWidth = containerRef.current.offsetWidth;
			const slideWidth = isMobile ? Math.min(containerWidth + 24, 504) : Math.min(containerWidth / 3, 480);
			const initialOffset = -(items.length * slideWidth * 2);
			x.set(initialOffset);
		}
	}, [items.length, isMobile, x]);

	// Smooth animation with Framer Motion
	useAnimationFrame((time, delta) => {
		if (!containerRef.current || isHovered) return;

		const containerWidth = containerRef.current.offsetWidth;
		const slideWidth = isMobile ? Math.min(containerWidth + 24, 504) : Math.min(containerWidth / 3, 480);

		// Smooth movement based on delta time for consistent speed
		const speed = 60; // pixels per second
		const movement = (speed * delta) / 1000;

		const currentX = x.get();
		const newX = currentX - movement;

		// Reset position when we've scrolled through 3 full sets
		const resetPoint = -(items.length * slideWidth * 4);
		if (newX <= resetPoint) {
			x.set(-(items.length * slideWidth * 2));
		} else {
			x.set(newX);
		}
	});

	return (
		<section className='pt-14 pb-16 md:py-20 bg-[#17141A]'>
			{/* Carousel */}
			<div ref={containerRef} className='relative overflow-hidden px-3 md:px-6'>
				<motion.div
					className='flex gap-6 md:gap-0 pointer-events-none'
					style={{
						x: xTransform,
						willChange: "transform",
					}}
				>
					{duplicatedItems.map((item, index) => (
						<AppCard key={`${item.id}-${index}`} {...item} onMediaHover={setIsHovered} />
					))}
				</motion.div>
			</div>

			<Container size='lg' className='max-w-[1680px]'>
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
