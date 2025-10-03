"use client";

import Container from "@/components/Container/Container";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { getCachedVideoBlobUrl, warmVideosCacheByViewport, isMobileViewport } from "@/utils/videoCache";

const AppCard = ({
	title,
	description,
	image,
	url,
	chainIcon,
	videoUrl,
	mobileVideoUrl,
	poster,
	mobilePoster,
	onMediaHover,
	index,
	items,
	shouldStartLoading,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
	const [resolvedSrc, setResolvedSrc] = useState(null);
	const videoRef = useRef(null);

	// Only load video for unique items to prevent duplicate downloads
	useEffect(() => {
		// Don't load until carousel is visible
		if (!shouldStartLoading) return;

		// Create a unique identifier for this video URL to prevent duplicates
		const videoKey = videoUrl ? videoUrl.split("/").pop() : null;

		if (!videoKey) return;

		// Check if this video has already been loaded by another card
		const loadedVideos = window.celestiaLoadedVideos || new Set();
		if (!window.celestiaLoadedVideos) {
			window.celestiaLoadedVideos = loadedVideos;
		}

		// Get the original item index to avoid loading duplicates
		const originalItemIndex = index % items.length;
		// Only load video for the first occurrence of each unique item
		const isFirstOccurrence = Math.floor(index / items.length) === 2; // Middle set (index 2 of 5 sets)

		if (isFirstOccurrence && originalItemIndex < items.length && !loadedVideos.has(videoKey)) {
			loadedVideos.add(videoKey);
			setShouldLoadVideo(true);
		}
	}, [index, items.length, videoUrl, shouldStartLoading]);

	useEffect(() => {
		if (videoRef.current && shouldLoadVideo && resolvedSrc) {
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
	}, [shouldLoadVideo, resolvedSrc]);

	// Resolve to a cached blob URL when we decide to load
	// Re-resolve if viewport size changes (mobile <-> desktop)
	useEffect(() => {
		if (!shouldLoadVideo || !videoUrl) return;

		const updateVideoSrc = () => {
			const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
			const targetUrl = isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl;

			getCachedVideoBlobUrl(targetUrl).then((blobUrl) => {
				setResolvedSrc(blobUrl);
			});
		};

		updateVideoSrc();

		// Listen for viewport changes to switch between mobile/desktop videos
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateVideoSrc, 150); // Debounce
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(resizeTimeout);
		};
	}, [shouldLoadVideo, videoUrl, mobileVideoUrl]);

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
					{videoUrl && shouldLoadVideo && resolvedSrc ? (
						<video
							ref={videoRef}
							muted
							loop
							playsInline
							webkit-playsinline='true'
							autoPlay
							preload='auto'
							poster={poster || mobilePoster}
							className='object-cover w-full h-full pointer-events-none select-none'
							src={resolvedSrc}
						></video>
					) : (
						<>
							{/* Show poster image as fallback or when video isn't loaded yet */}
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={videoUrl ? poster || mobilePoster : image}
								alt={title}
								className='object-cover w-full h-full pointer-events-none select-none'
								draggable='false'
							/>
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
	const [hasWarmedCache, setHasWarmedCache] = useState(false);

	// Framer Motion values
	const x = useMotionValue(0);
	const xTransform = useTransform(x, (value) => `${value}px`);

	// Duplicate items for infinite scroll - use more copies for seamless loop
	const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

	// Clear loaded videos set on mount to ensure fresh state
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.celestiaLoadedVideos = new Set();
		}
	}, []);

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Lazy load videos when carousel is 200px from bottom of viewport
	useEffect(() => {
		const container = containerRef.current;
		if (!container || hasWarmedCache) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasWarmedCache) {
						// Start warming cache when carousel enters viewport
						warmVideosCacheByViewport(items);
						setHasWarmedCache(true);
					}
				});
			},
			{
				rootMargin: "0px 0px 200px 0px", // Trigger 200px before carousel enters viewport from bottom
				threshold: 0,
			}
		);

		observer.observe(container);

		return () => {
			observer.unobserve(container);
		};
	}, [items, hasWarmedCache]);

	// Re-warm cache on viewport resize if already warmed (mobile <-> desktop switch)
	useEffect(() => {
		if (!hasWarmedCache) return;

		let wasMobile = isMobileViewport();

		const handleResize = () => {
			const isMobileNow = isMobileViewport();
			// Only warm cache if viewport crossed the mobile/desktop threshold
			if (isMobileNow !== wasMobile) {
				wasMobile = isMobileNow;
				// Warm missing videos for new viewport size
				warmVideosCacheByViewport(items);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [items, hasWarmedCache]);

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
		<section className='pt-14 pb-16 md:py-40 bg-[#17141A]'>
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
						<AppCard
							key={`${item.id}-${index}`}
							{...item}
							index={index}
							items={items}
							onMediaHover={setIsHovered}
							shouldStartLoading={hasWarmedCache}
						/>
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
