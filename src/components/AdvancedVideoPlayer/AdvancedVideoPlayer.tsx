/**
 * Video Component
 *
 * A React component that handles video playback with poster image support and responsive behavior.
 * Built on top of react-player with additional features for mobile optimization and debugging.
 *
 * Key Features:
 * - Lazy loaded video playback via react-player
 * - Responsive video and poster switching based on viewport size
 * - Optional smooth transitions between poster and video
 * - Poster image support with configurable fade out
 * - Fallback background color when no media is present
 * - Debug panel with detailed playback information
 * - Responsive sizing and custom object-fit support
 *
 * Props:
 * @param {string} className - Optional CSS class name
 * @param {'contain'|'cover'|'fill'|'none'|'scale-down'} objectFit - Video object-fit property (default: 'cover')
 * @param {string|number} width - Container width (default: '100%')
 * @param {string|number} height - Container height (default: '100%')
 * @param {string} url - Desktop video URL
 * @param {string} mobileUrl - Mobile video URL (switches at 768px breakpoint)
 * @param {boolean} debug - Show debug panel (default: false)
 * @param {string} fallbackColor - Background color shown when no media is present (default: 'white')
 * @param {string} poster - Desktop poster image URL
 * @param {string} mobilePoster - Mobile poster image URL (switches at 768px breakpoint)
 * @param {number} posterQuality - Quality of poster image 1-100 (default: 100)
 * @param {boolean} smoothTransition - Enable smooth fade transition between poster and video (default: false)
 * @param {...ReactPlayerProps} props - Additional react-player props
 *
 * States:
 * - mounted: Tracks client-side hydration
 * - isBuffering: Video buffer state
 * - isVideoReady: Video ready to play
 * - posterOpacity: Controls poster visibility (0-1)
 * - isMobile: Tracks viewport size for responsive assets (<768px)
 *
 * Layout:
 * The component uses absolute positioning with z-index layers:
 * 1. Background color (z-0) - Only visible when no media is present
 * 2. Video player (z-1)
 * 3. Poster image (z-2)
 * 4. Debug panel (z-50)
 *
 * Loading Sequence:
 * 1. Shows poster image on initial render
 * 2. Loads video in background
 * 3. When video is ready:
 *    - With smoothTransition: Fades out poster over 0.3s
 *    - Without smoothTransition: Immediately switches to video
 *
 * Responsive Behavior:
 * - Automatically switches between desktop/mobile assets based on viewport width
 * - Breakpoint at 768px (md)
 * - Updates on window resize
 * - Uses unoptimized Image component for posters to prevent quality loss
 *
 * Example:
 * ```tsx
 * <Video
 *   url="/videos/desktop.mp4"
 *   mobileUrl="/videos/mobile.mp4"
 *   poster="/images/desktop-poster.jpg"
 *   mobilePoster="/images/mobile-poster.jpg"
 *   smoothTransition={true}
 *   playing
 *   loop
 *   muted
 *   debug
 * />
 * ```
 */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

interface VideoProps extends Omit<ReactPlayerProps, "width" | "height"> {
	className?: string;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	width?: string | number;
	height?: string | number;
	url: string;
	debug?: boolean;
	fallbackColor?: string;
	poster?: string;
	posterQuality?: number;
	mobileUrl?: string;
	mobilePoster?: string;
	smoothTransition?: boolean;
}

export const Video = ({
	className = "",
	objectFit = "cover",
	width = "100%",
	height = "100%",
	url,
	debug = false,
	fallbackColor = "white",
	poster,
	posterQuality = 100,
	mobileUrl,
	mobilePoster,
	smoothTransition = false,
	onReady,
	...props
}: VideoProps) => {
	const [mounted, setMounted] = useState(false);
	const [isBuffering, setIsBuffering] = useState(true);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [posterOpacity, setPosterOpacity] = useState(1);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleReady = (...args: unknown[]) => {
		if (smoothTransition) {
			// First make video ready but keep poster visible
			setIsBuffering(false);
			setIsVideoReady(true);
			onReady?.(...args);

			// Small delay to ensure video is actually playing before fading poster
			setTimeout(() => {
				setPosterOpacity(0);
			}, 100);
		} else {
			// Only remove poster after video is fully ready
			setIsBuffering(false);
			setIsVideoReady(true);
			// Small delay to ensure video is visible before removing poster
			requestAnimationFrame(() => {
				setPosterOpacity(0);
			});
			onReady?.(...args);
		}
	};

	const videoUrl = isMobile && mobileUrl ? mobileUrl : url;
	const posterImage = isMobile && mobilePoster ? mobilePoster : poster;

	// Initial render - only show poster
	if (!mounted) {
		return (
			<div className={className} style={{ position: "relative", width, height }}>
				<div
					style={{
						position: "absolute",
						inset: 0,
						backgroundColor: fallbackColor,
						zIndex: 0,
					}}
				/>
				{posterImage && (
					<div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
						<Image
							src={posterImage}
							alt='Video poster'
							fill
							className='object-cover'
							priority
							quality={posterQuality}
							sizes='100vw'
							unoptimized
						/>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className={className} style={{ position: "relative", width, height }}>
			{/* Background color layer - only visible if no poster and no video */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundColor: fallbackColor,
					zIndex: 0,
					opacity: !posterImage && !isVideoReady ? 1 : 0,
				}}
			/>

			{/* Video layer - no transition on opacity */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 1,
					opacity: isVideoReady ? 1 : 0,
				}}
			>
				<ReactPlayer
					url={videoUrl}
					width='100%'
					height='100%'
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
					config={{
						file: {
							attributes: {
								style: {
									width: "100%",
									height: "100%",
									objectFit,
								},
								playsInline: true,
								webkitplaysinline: "true",
							},
						},
					}}
					onBuffer={() => setIsBuffering(true)}
					onBufferEnd={() => setIsBuffering(false)}
					onReady={handleReady}
					{...props}
				/>
			</div>

			{/* Poster layer - only transition this layer */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 2,
					opacity: posterOpacity,
					pointerEvents: posterOpacity === 0 ? "none" : "auto",
					...(smoothTransition && {
						transition: "opacity 0.3s ease-out",
					}),
				}}
			>
				{posterImage && (
					<Image
						src={posterImage}
						alt='Video poster'
						fill
						className='object-cover'
						priority
						quality={posterQuality}
						sizes='100vw'
						unoptimized
					/>
				)}
			</div>

			{/* Updated Debug Panel - Centered at bottom */}
			{debug && mounted && (
				<div
					className='absolute bottom-4 left-1/2 z-50 min-w-[320px] -translate-x-1/2 rounded-md border border-white/10 bg-black/80 px-3 py-2 font-mono text-xs text-white shadow-lg'
					style={{
						maxWidth: "min(90%, 400px)",
						overflow: "hidden",
					}}
				>
					<div className='space-y-1'>
						<div className='flex justify-between gap-4'>
							<span>Screen:</span>
							<span>{isMobile ? "Mobile" : "Desktop"}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Width:</span>
							<span>{window?.innerWidth + "px"}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Video:</span>
							<span>{videoUrl?.split("/").pop()}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Poster:</span>
							<span>{posterImage?.split("/").pop()}</span>
						</div>
						<div>
							<div className='my-2 border-t border-white/20' />
						</div>
						<div className='flex justify-between gap-4'>
							<span>Status:</span>
							<span>{isBuffering ? "Buffering" : "Playing"}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Ready:</span>
							<span>{isVideoReady ? "Yes" : "No"}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Poster Opacity:</span>
							<span>{posterOpacity}</span>
						</div>
						<div className='flex justify-between gap-4'>
							<span>Quality:</span>
							<span>{posterQuality}%</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
