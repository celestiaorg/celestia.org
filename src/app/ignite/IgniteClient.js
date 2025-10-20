"use client";
import { Row, Col } from "@/macros/Grids";
import Container from "@/components/Container/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

// Animation variants
const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.21, 1.02, 0.73, 1],
		},
	},
};

const fadeInOnly = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 1, 0.5, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const staggerContainerDelayed = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 2.0,
		},
	},
};

const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 1.0,
			ease: [0.25, 1, 0.5, 1],
		},
	},
};

// Static shooting star timing intervals (in milliseconds)
const SHOOTING_STAR_INTERVALS = [4000, 5500, 3500, 6000, 4500, 5000, 3800, 5200, 4200, 4800];
const FOOTER_SHOOTING_STAR_INTERVALS = [6000, 7000, 5500, 7500, 6500, 6800, 5800, 7200, 6200, 6600];
const SHOOTING_STAR_LIFETIME = 1200;

function getRandomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

// Static shooting star configurations
const SHOOTING_STAR_PATTERNS = {
	mobile: [
		// Left side patterns
		{ startX: 8, startY: 5, angle: 25, speed: 1.2, distance: 40, intensity: 0.6, length: 35 },
		{ startX: 15, startY: 8, angle: 30, speed: 1.8, distance: 45, intensity: 0.8, length: 40 },
		{ startX: 22, startY: 12, angle: 35, speed: 1.5, distance: 50, intensity: 0.7, length: 38 },
		{ startX: 5, startY: 15, angle: 20, speed: 1.0, distance: 35, intensity: 0.5, length: 30 },
		{ startX: 18, startY: 18, angle: 28, speed: 1.6, distance: 42, intensity: 0.9, length: 45 },
		// Right side patterns
		{ startX: 85, startY: 6, angle: 25, speed: 1.3, distance: 38, intensity: 0.7, length: 32 },
		{ startX: 92, startY: 10, angle: 30, speed: 1.9, distance: 48, intensity: 0.8, length: 42 },
		{ startX: 78, startY: 14, angle: 35, speed: 1.4, distance: 46, intensity: 0.6, length: 36 },
		{ startX: 95, startY: 16, angle: 22, speed: 1.1, distance: 33, intensity: 0.5, length: 28 },
		{ startX: 88, startY: 20, angle: 32, speed: 1.7, distance: 44, intensity: 0.9, length: 40 },
	],
	desktop: [
		// Left side patterns
		{ startX: 12, startY: 8, angle: 20, speed: 1.5, distance: 90, intensity: 0.7, length: 70 },
		{ startX: 25, startY: 12, angle: 25, speed: 2.0, distance: 110, intensity: 0.8, length: 85 },
		{ startX: 8, startY: 18, angle: 30, speed: 1.8, distance: 100, intensity: 0.6, length: 75 },
		{ startX: 30, startY: 22, angle: 22, speed: 1.2, distance: 80, intensity: 0.5, length: 60 },
		{ startX: 15, startY: 28, angle: 28, speed: 2.2, distance: 120, intensity: 0.9, length: 95 },
		{ startX: 22, startY: 35, angle: 32, speed: 1.6, distance: 105, intensity: 0.7, length: 80 },
		{ startX: 5, startY: 15, angle: 18, speed: 1.3, distance: 85, intensity: 0.6, length: 65 },
		{ startX: 18, startY: 8, angle: 26, speed: 1.9, distance: 95, intensity: 0.8, length: 78 },
		// Right side patterns
		{ startX: 88, startY: 10, angle: 20, speed: 1.4, distance: 88, intensity: 0.7, length: 68 },
		{ startX: 75, startY: 15, angle: 25, speed: 2.1, distance: 115, intensity: 0.9, length: 90 },
		{ startX: 92, startY: 20, angle: 30, speed: 1.7, distance: 98, intensity: 0.6, length: 72 },
		{ startX: 82, startY: 25, angle: 22, speed: 1.1, distance: 75, intensity: 0.5, length: 58 },
		{ startX: 95, startY: 30, angle: 28, speed: 2.3, distance: 125, intensity: 0.8, length: 88 },
		{ startX: 78, startY: 12, angle: 32, speed: 1.5, distance: 102, intensity: 0.7, length: 76 },
		{ startX: 85, startY: 35, angle: 18, speed: 1.2, distance: 82, intensity: 0.6, length: 62 },
		{ startX: 90, startY: 8, angle: 26, speed: 1.8, distance: 92, intensity: 0.8, length: 74 },
	],
};

let shootingStarIndex = 0;
let intervalIndex = 0;
let footerIntervalIndex = 0;

function createShootingStar(id) {
	const isMobile = window.innerWidth < 768;
	const patterns = isMobile ? SHOOTING_STAR_PATTERNS.mobile : SHOOTING_STAR_PATTERNS.desktop;

	// Cycle through patterns
	const pattern = patterns[shootingStarIndex % patterns.length];
	shootingStarIndex++;

	return {
		id,
		startX: pattern.startX,
		startY: pattern.startY,
		angle: pattern.angle,
		speed: pattern.speed,
		distance: pattern.distance,
		intensity: pattern.intensity,
		length: pattern.length,
		createdAt: performance.now(),
	};
}

export default function IgniteClient() {
	const [visibleStars, setVisibleStars] = useState([]);
	const [sheenKey, setSheenKey] = useState(0);
	const [shootingStars, setShootingStars] = useState([]);
	const [footerShootingStars, setFooterShootingStars] = useState([]);

	const triggerSheen = () => {
		setSheenKey((prev) => prev + 1);
	};

	const scheduleNextShootingStarRef = useRef(null);

	const spawnShootingStar = useCallback(() => {
		const now = performance.now();
		setShootingStars((prev) => {
			const id = `shooting-star-${now}`;
			const nextStars = [...prev, createShootingStar(id)];
			const recentStars = nextStars.filter((star) => now - star.createdAt < SHOOTING_STAR_LIFETIME);
			return recentStars.slice(-3);
		});
	}, []);

	const spawnFooterShootingStar = useCallback(() => {
		const now = performance.now();
		setFooterShootingStars((prev) => {
			const id = `footer-shooting-star-${now}`;
			const nextStars = [...prev, createShootingStar(id)];
			const recentStars = nextStars.filter((star) => now - star.createdAt < SHOOTING_STAR_LIFETIME);
			return recentStars.slice(-2); // Fewer footer stars
		});
	}, []);

	const scheduleNextStar = useCallback(() => {
		// Cycle through static intervals
		const nextDelay = SHOOTING_STAR_INTERVALS[intervalIndex % SHOOTING_STAR_INTERVALS.length];
		intervalIndex++;

		scheduleNextShootingStarRef.current = window.setTimeout(() => {
			spawnShootingStar();
			scheduleNextStar();
		}, nextDelay);
	}, [spawnShootingStar]);

	const scheduleNextFooterStarRef = useRef(null);

	const scheduleNextFooterStar = useCallback(() => {
		// Cycle through static footer intervals
		const nextDelay = FOOTER_SHOOTING_STAR_INTERVALS[footerIntervalIndex % FOOTER_SHOOTING_STAR_INTERVALS.length];
		footerIntervalIndex++;

		scheduleNextFooterStarRef.current = window.setTimeout(() => {
			spawnFooterShootingStar();
			scheduleNextFooterStar();
		}, nextDelay);
	}, [spawnFooterShootingStar]);

	// Auto-trigger sheen at random intervals (2-4 seconds)
	useEffect(() => {
		const scheduleNextSheen = () => {
			const randomDelay = 2000 + Math.random() * 2000; // 2-4 seconds in milliseconds

			const timeoutId = setTimeout(() => {
				triggerSheen();
				scheduleNextSheen(); // Schedule the next one
			}, randomDelay);

			return timeoutId;
		};

		const timeoutId = scheduleNextSheen();

		// Cleanup timeout on unmount
		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		let animationFrameId;

		const animate = () => {
			const now = performance.now();
			setShootingStars((prev) => prev.filter((star) => now - star.createdAt < SHOOTING_STAR_LIFETIME));
			setFooterShootingStars((prev) => prev.filter((star) => now - star.createdAt < SHOOTING_STAR_LIFETIME));
			animationFrameId = window.requestAnimationFrame(animate);
		};

		spawnShootingStar();
		scheduleNextStar();

		// Start footer stars with delay to avoid overlap
		setTimeout(() => {
			spawnFooterShootingStar();
			scheduleNextFooterStar();
		}, 3000);

		animationFrameId = window.requestAnimationFrame(animate);

		return () => {
			if (scheduleNextShootingStarRef.current) {
				window.clearTimeout(scheduleNextShootingStarRef.current);
			}
			if (scheduleNextFooterStarRef.current) {
				window.clearTimeout(scheduleNextFooterStarRef.current);
			}

			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId);
			}
		};
	}, [spawnShootingStar, scheduleNextStar, spawnFooterShootingStar, scheduleNextFooterStar]);

	// Progressive star loading function
	const revealStarsProgressively = useCallback((starList) => {
		const totalStars = starList.length;
		const revealInterval = 40; // 120ms between each star

		// Clear existing stars first
		setVisibleStars([]);

		starList.forEach((star, index) => {
			setTimeout(() => {
				setVisibleStars((prev) => [...prev, star]);
			}, index * revealInterval);
		});

		// Progressive reveal complete
	}, []);

	useLayoutEffect(() => {
		// Generate stars synchronously to prevent hydration flash
		const generateStars = () => {
			const isMobile = window.innerWidth < 768;

			// Static star positions - no randomness
			const staticStars = isMobile
				? [
						// Mobile dim stars - top left area
						{ id: "mobile-top-left-1", top: 8, left: 12, duration: 2.5, delay: 0.3, isBright: false },
						{ id: "mobile-top-left-2", top: 15, left: 8, duration: 3.2, delay: 1.1, isBright: false },
						{ id: "mobile-top-left-3", top: 22, left: 15, duration: 2.8, delay: 0.7, isBright: false },
						{ id: "mobile-top-left-4", top: 12, left: 5, duration: 3.5, delay: 1.8, isBright: false },
						{ id: "mobile-top-left-5", top: 18, left: 20, duration: 2.2, delay: 0.5, isBright: false },
						{ id: "mobile-top-left-6", top: 25, left: 10, duration: 2.9, delay: 1.3, isBright: false },

						// Mobile dim stars - top right area
						{ id: "mobile-top-right-1", top: 10, left: 88, duration: 2.7, delay: 0.9, isBright: false },
						{ id: "mobile-top-right-2", top: 17, left: 92, duration: 3.1, delay: 1.6, isBright: false },
						{ id: "mobile-top-right-3", top: 24, left: 85, duration: 2.4, delay: 0.4, isBright: false },
						{ id: "mobile-top-right-4", top: 14, left: 95, duration: 3.3, delay: 1.9, isBright: false },
						{ id: "mobile-top-right-5", top: 20, left: 78, duration: 2.6, delay: 0.8, isBright: false },
						{ id: "mobile-top-right-6", top: 28, left: 90, duration: 2.9, delay: 1.4, isBright: false },

						// Mobile dim stars - far edges
						{ id: "mobile-far-left-1", top: 6, left: 3, duration: 2.8, delay: 0.6, isBright: false },
						{ id: "mobile-far-left-2", top: 19, left: 7, duration: 3.4, delay: 1.7, isBright: false },
						{ id: "mobile-far-left-3", top: 13, left: 1, duration: 2.5, delay: 0.2, isBright: false },
						{ id: "mobile-far-left-4", top: 26, left: 4, duration: 3.0, delay: 1.2, isBright: false },

						{ id: "mobile-far-right-1", top: 9, left: 97, duration: 2.6, delay: 0.8, isBright: false },
						{ id: "mobile-far-right-2", top: 16, left: 99, duration: 3.2, delay: 1.5, isBright: false },
						{ id: "mobile-far-right-3", top: 23, left: 96, duration: 2.7, delay: 0.3, isBright: false },
						{ id: "mobile-far-right-4", top: 30, left: 98, duration: 2.9, delay: 1.1, isBright: false },

						// Mobile sparkles - only side positions
						{ id: "mobile-sparkle-left-1", top: 8, left: 15, duration: 2.0, delay: 0, isBright: true },
						{ id: "mobile-sparkle-left-2", top: 20, left: 5, duration: 2.5, delay: 1.0, isBright: true },
						{ id: "mobile-sparkle-right-1", top: 12, left: 88, duration: 1.8, delay: 0.5, isBright: true },
						{ id: "mobile-sparkle-right-2", top: 22, left: 95, duration: 2.2, delay: 1.5, isBright: true },
				  ]
				: [
						// Desktop dim stars - top left area
						{ id: "desktop-top-left-1", top: 12, left: 15, duration: 2.8, delay: 0.4, isBright: false },
						{ id: "desktop-top-left-2", top: 18, left: 8, duration: 3.2, delay: 1.2, isBright: false },
						{ id: "desktop-top-left-3", top: 25, left: 22, duration: 2.5, delay: 0.8, isBright: false },
						{ id: "desktop-top-left-4", top: 15, left: 12, duration: 3.0, delay: 1.6, isBright: false },
						{ id: "desktop-top-left-5", top: 22, left: 18, duration: 2.7, delay: 0.6, isBright: false },
						{ id: "desktop-top-left-6", top: 28, left: 5, duration: 2.9, delay: 1.4, isBright: false },

						// Desktop dim stars - top right area
						{ id: "desktop-top-right-1", top: 14, left: 85, duration: 2.6, delay: 0.9, isBright: false },
						{ id: "desktop-top-right-2", top: 20, left: 92, duration: 3.1, delay: 1.7, isBright: false },
						{ id: "desktop-top-right-3", top: 26, left: 78, duration: 2.4, delay: 0.3, isBright: false },
						{ id: "desktop-top-right-4", top: 16, left: 95, duration: 3.3, delay: 1.9, isBright: false },
						{ id: "desktop-top-right-5", top: 23, left: 82, duration: 2.8, delay: 0.7, isBright: false },
						{ id: "desktop-top-right-6", top: 30, left: 88, duration: 2.9, delay: 1.3, isBright: false },

						// Desktop dim stars - far edges
						{ id: "desktop-far-left-1", top: 8, left: 3, duration: 2.7, delay: 0.5, isBright: false },
						{ id: "desktop-far-left-2", top: 21, left: 7, duration: 3.4, delay: 1.8, isBright: false },
						{ id: "desktop-far-left-3", top: 15, left: 1, duration: 2.3, delay: 0.1, isBright: false },
						{ id: "desktop-far-left-4", top: 28, left: 4, duration: 2.9, delay: 1.1, isBright: false },

						{ id: "desktop-far-right-1", top: 11, left: 97, duration: 2.5, delay: 0.8, isBright: false },
						{ id: "desktop-far-right-2", top: 18, left: 99, duration: 3.2, delay: 1.6, isBright: false },
						{ id: "desktop-far-right-3", top: 25, left: 96, duration: 2.6, delay: 0.2, isBright: false },
						{ id: "desktop-far-right-4", top: 32, left: 98, duration: 2.8, delay: 1.0, isBright: false },

						// Desktop sparkles - left side
						{ id: "desktop-sparkle-left-1", top: 15, left: 20, duration: 2.0, delay: 0, isBright: true },
						{ id: "desktop-sparkle-left-2", top: 35, left: 8, duration: 2.5, delay: 1.0, isBright: true },
						{ id: "desktop-sparkle-left-3", top: 12, left: 15, duration: 1.8, delay: 0.3, isBright: true },
						{ id: "desktop-sparkle-left-4", top: 28, left: 12, duration: 2.2, delay: 1.2, isBright: true },
						{ id: "desktop-sparkle-left-5", top: 8, left: 25, duration: 2.3, delay: 0.6, isBright: true },
						{ id: "desktop-sparkle-left-6", top: 32, left: 18, duration: 1.9, delay: 1.5, isBright: true },
						{ id: "desktop-sparkle-left-7", top: 18, left: 5, duration: 2.1, delay: 0.9, isBright: true },
						{ id: "desktop-sparkle-left-8", top: 25, left: 22, duration: 2.4, delay: 1.8, isBright: true },

						// Desktop sparkles - right side
						{ id: "desktop-sparkle-right-1", top: 25, left: 85, duration: 1.8, delay: 0.5, isBright: true },
						{ id: "desktop-sparkle-right-2", top: 40, left: 92, duration: 2.2, delay: 1.5, isBright: true },
						{ id: "desktop-sparkle-right-3", top: 18, left: 88, duration: 2.0, delay: 0.8, isBright: true },
						{ id: "desktop-sparkle-right-4", top: 32, left: 95, duration: 1.7, delay: 1.3, isBright: true },
						{ id: "desktop-sparkle-right-5", top: 12, left: 82, duration: 2.5, delay: 0.2, isBright: true },
						{ id: "desktop-sparkle-right-6", top: 38, left: 78, duration: 2.1, delay: 1.7, isBright: true },
						{ id: "desktop-sparkle-right-7", top: 22, left: 98, duration: 1.9, delay: 0.4, isBright: true },
						{ id: "desktop-sparkle-right-8", top: 35, left: 85, duration: 2.3, delay: 1.1, isBright: true },
				  ];

			// Start progressive reveal immediately
			revealStarsProgressively(staticStars);
		};

		generateStars();
	}, [revealStarsProgressively]);

	return (
		<div className='bg-[#040215] min-h-screen'>
			{/* Hero Section - Background with floating mammoth */}
			<section className='relative overflow-hidden aspect-square md:aspect-[7/4] lg:aspect-[20/9] xl:aspect-[22/7]'>
				<motion.div
					className='w-full h-full'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Image
						src='/images/app/mammoth/R4_Final_Upscaled_Clean-expanded.png'
						// src='/images/app/mammoth/mammoth-hero-wide-no-logo.jpg'
						alt='Mammoth Hero Background'
						width={1920}
						height={1080}
						className='w-full h-full object-cover object-bottom'
						priority
					/>
				</motion.div>

				{/* Blinking Stars - only in sky area, avoiding spaceship center */}
				<div className='absolute inset-0 pointer-events-none'>
					{visibleStars.map((star) => (
						<motion.div
							key={star.id}
							className={`absolute ${star.isBright ? "w-4 h-4" : "w-1 h-1 bg-white rounded-full"}`}
							style={{
								top: `${star.top}%`,
								left: `${star.left}%`,
								transform: star.isBright ? "translate(-50%, -50%)" : "none",
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: star.isBright ? [0.1, 0.9, 0.1] : [0.1, 0.4, 0.1],
								scale: star.isBright ? [0.4, 1.4, 0.4] : [0.3, 0.8, 0.3],
								rotate: star.isBright ? [0, 180, 0] : 0,
							}}
							transition={{
								duration: star.duration,
								repeat: Infinity,
								delay: star.delay,
								repeatDelay: star.isBright ? 3 + Math.random() * 2 : 0,
								ease: "easeInOut",
							}}
						>
							{star.isBright ? (
								<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
							) : null}
						</motion.div>
					))}
					{shootingStars.map((star) => {
						// Calculate movement based on angle
						const angleRad = (star.angle * Math.PI) / 180;
						const deltaX = Math.cos(angleRad) * star.distance;
						const deltaY = Math.sin(angleRad) * star.distance;

						return (
							<motion.div
								key={star.id}
								className='absolute h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-white/50 to-white rounded-full'
								style={{
									top: `${star.startY}%`,
									left: `${star.startX}%`,
									width: `${star.length}px`,
									transformOrigin: "left center",
								}}
								initial={{
									opacity: 0,
									x: 0,
									y: 0,
									rotate: star.angle,
								}}
								animate={{
									opacity: [0, star.intensity, 0],
									x: deltaX,
									y: deltaY,
									rotate: star.angle,
								}}
								transition={{
									duration: SHOOTING_STAR_LIFETIME / 1000,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
							/>
						);
					})}
				</div>

				{/* Celestia Logo Sign Post */}
				{/* <motion.div
					className='absolute w-[12vw] sm:w-[8vw] md:w-[6vw] bottom-[8%] right-[22%] sm:right-[28%] md:right-[37%]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 1.2,
						delay: 0.6,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					<div className='relative w-full h-full cursor-pointer'>
						<Image
							src='/images/app/mammoth/celestia-logo-cutout-4.png'
							alt='Celestia Logo Sign Post'
							width={300}
							height={400}
							className='w-full h-auto object-contain'
							priority
						/>
						<div
							className='absolute transform left-[54%] -translate-x-1/2 w-[70%] h-[50%] top-[2%] opacity-50 overflow-hidden'
							onMouseEnter={triggerSheen}
						>
							<div
								key={sheenKey}
								className='absolute inset-0 -translate-x-full animate-sheen w-[300%]'
								style={{
									background:
										"linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 60%, transparent 100%)",
									animation: "sheen 1500ms forwards",
								}}
							/>
						</div>
					</div>
				</motion.div> */}

				{/* Floating Mammoth Overlay */}
				{/* <motion.div
					className='absolute w-[35vw] md:w-[16vw] lg:w-[15vw]'
					initial={{ opacity: 0, y: 50, bottom: "16%", left: "50%", x: "-50%", rotate: 0 }}
					animate={{
						opacity: 1,
						y: [0, -12, 0],
						rotate: [-2, 3, -2],
					}}
					transition={{
						opacity: {
							duration: 1.8,
							delay: 0.2,
							ease: [0.22, 1, 0.36, 1],
						},
						y: {
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 1.8,
						},
						rotate: {
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2.2,
						},
					}}
				>
					<div className='relative w-full h-full'>
						<Image
							src='/images/app/mammoth/mammoth.png'
							alt='Floating Mammoth'
							width={400}
							height={300}
							className='w-full h-auto object-contain'
							priority
						/>
					</div>
				</motion.div> */}
			</section>

			{/* Main Content Section */}
			<section
				className='pb-24 lg:pb-32'
				style={{
					background: "linear-gradient(to top, #1E014D 0%, #05010C 100%)",
				}}
			>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							{/* Date and Location Row */}
							<motion.div
								className='flex flex-row gap-3 sm:gap-10 mb-3 lg:mb-0 justify-center'
								initial='hidden'
								animate='visible'
								variants={staggerContainerDelayed}
							>
								<motion.div className='flex items-center gap-3 justify-center' variants={fadeInOnly}>
									<p className='text-[#8AF4FF] font-medium text-sm sm:text-xl'>NOVEMBER 19TH</p>
								</motion.div>
								<motion.div className='flex items-center gap-3 justify-center' variants={fadeInOnly}>
									<p className='text-[#8AF4FF] font-medium text-sm sm:text-xl'>BUENOS AIRES</p>
								</motion.div>
							</motion.div>

							{/* Large Heading */}
							<motion.h1
								className='mb-12 lg:mb-8 uppercase font-druk text-[#8AF4FF] text-[28vw] sm:text-[180px] md:text-[200px] lg:text-[240px] leading-[0.9] text-center'
								style={{ textShadow: "0 0 0px #8AF4FF, 0 0 5px #8AF4FF" }}
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 1.2,
											delay: 1.2,
											ease: [0.16, 1, 0.3, 1],
										},
									},
								}}
							>
								IGNITE
							</motion.h1>

							{/* Tickets Button */}
							<motion.div
								className='mb-16 lg:mb-24 flex justify-center'
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0, y: 15 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 1.0,
											delay: 2.6,
											ease: [0.23, 1, 0.32, 1],
										},
									},
								}}
							>
								<div className='relative overflow-hidden px-6 py-2 bg-[#9A34C2] text-white font-medium text-xl rounded-[36px] uppercase'>
									<span className='font-druk uppercase text-4xl sm:text-5xl relative z-1 text-[#8AF4FF]'>TICKETS SOON</span>
								</div>
							</motion.div>

							{/* Paragraph Content */}
							<motion.div
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: {
											staggerChildren: 0.25,
											delayChildren: 3.2,
										},
									},
								}}
							>
								<motion.p
									className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] mb-8 sm:mb-16 text-white'
									variants={fadeInUp}
								>
									<span className='text-[#CB44FF] font-medium'>Introducing the first edition of Ignite</span> — a Celestia global
									event series celebrating builders and unstoppable apps, now landing in Buenos Aires. This year, in collaboration
									with The Rollup, Ignite will bring together communities to explore the future of what&apos;s possible onchain with
									mammoth throughput and Celestia underneath.
								</motion.p>
								<motion.p
									className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] text-white'
									variants={fadeInUp}
								>
									A recent shift from Modular Summit to Ignite marks a refreshed brand that better reflects Celestia&apos;s
									long-term vision. Ignite builds on the strong foundation of past events while evolving into a more intimate,
									future-focused gathering.
								</motion.p>
							</motion.div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Image Gallery Section */}
			<section
				className='relative'
				style={{
					background: "linear-gradient(to bottom, #1E014D 0%, #040215 100%)",
				}}
			>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							<motion.h1
								className='mb-8 sm:mb-12 font-youth font-normal text-center text-[32px] leading-[40px] sm:text-[46px] sm:leading-[55px] text-[#8AF4FF]'
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: "-100px" }}
								variants={fadeInUp}
							>
								Last year Modular Summit, this year Ignite
							</motion.h1>
						</Col>
					</Row>
				</Container>
				<div className='max-w-[1680px] mx-auto px-2 relative'>
					{/* Gradient overlay */}
					<div
						className='absolute bottom-0 left-0 w-full h-[323px] pointer-events-none z-10'
						style={{
							background:
								"linear-gradient(360deg, #040215 5.42%, rgba(4, 2, 21, 0.9) 20.62%, rgba(4, 2, 21, 0.7) 33.66%, rgba(4, 2, 21, 0) 69.97%)",
						}}
					></div>
					<motion.div
						className='grid grid-cols-2 md:grid-cols-3 grid-rows-11 gap-3 h-[1200px] w-full'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.1 }}
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1,
									delayChildren: 0.2,
								},
							},
						}}
					>
						<div className='col-span-1 row-span-4'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-1.jpg'
									alt='Silhouettes viewing Modular Summit 3.0 map'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-6'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-2.jpg'
									alt='Large conference hall with networking crowd'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-4'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-3.jpg'
									alt='Panel discussion with microphone'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-7'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-5.jpg'
									alt='Tech conference panel with speakers on stage'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-3'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-4.jpg'
									alt='Sovereign Radio podcast recording at Modular Summit'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-6 sm:row-span-5'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-6.jpg'
									alt='Development workspace with multiple monitors and code'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
						<div className='col-span-1 row-span-4'>
							<motion.div
								className='h-full w-full bg-gray-200 rounded-lg overflow-hidden transform-gpu'
								style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
								variants={{
									hidden: { opacity: 0, y: 50 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											ease: "easeOut",
										},
									},
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src='/images/app/mammoth/image-7.jpg'
									alt='Conference stage with camera equipment'
									className='block w-full h-full object-cover'
									decoding='async'
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Sign up section */}
			<section className='pt-16 pb-32 lg:pb-48 lg:pt-40 max-w-[1680px] mx-auto px-2 relative overflow-hidden'>
				{/* Background Image */}
				<motion.div
					className='absolute inset-0'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-200px" }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				>
					<Image
						src='/images/app/mammoth/mammoth-footer.jpg'
						alt='Mammoth Footer Background'
						fill
						className='object-cover object-top'
						sizes='100vw'
					/>
				</motion.div>

				{/* Footer Stars, Sparkles and Shooting Stars */}
				<div className='absolute inset-0 pointer-events-none'>
					{/* Footer Shooting Stars */}
					{footerShootingStars.map((star) => {
						// Calculate movement based on angle for footer - upward movement
						const footerAngle = -star.angle; // Negative angle for upward movement
						const angleRad = (footerAngle * Math.PI) / 180;
						const deltaX = Math.cos(angleRad) * (star.distance * 0.6); // Smaller distance for footer
						const deltaY = Math.sin(angleRad) * (star.distance * 0.6);

						return (
							<motion.div
								key={`footer-${star.id}`}
								className='absolute h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-white/70 to-white rounded-full'
								style={{
									top: `${star.startY * 0.8 + 40}%`, // Start lower in footer for upward movement
									left: `${star.startX}%`,
									width: `${star.length * 0.9}px`, // Longer trails for footer
									transformOrigin: "left center",
								}}
								initial={{
									opacity: 0,
									x: 0,
									y: 0,
									rotate: footerAngle,
								}}
								animate={{
									opacity: [0, star.intensity * 0.9, 0], // Much brighter for footer
									x: deltaX,
									y: deltaY,
									rotate: footerAngle,
								}}
								transition={{ duration: SHOOTING_STAR_LIFETIME / 1000, ease: "easeOut" }}
							/>
						);
					})}

					{/* Additional Footer Center Shooting Stars */}
					{footerShootingStars.slice(0, 1).map((star, index) => {
						// Create center shooting stars with different positioning
						const footerAngle = -star.angle;
						const angleRad = (footerAngle * Math.PI) / 180;
						const deltaX = Math.cos(angleRad) * (star.distance * 0.5);
						const deltaY = Math.sin(angleRad) * (star.distance * 0.5);

						return (
							<motion.div
								key={`footer-center-${star.id}`}
								className='absolute h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-white/60 to-white/90 rounded-full'
								style={{
									top: `${star.startY * 0.6 + 50}%`, // Center area positioning
									left: `${35 + index * 15 + star.startX * 0.3}%`, // Center zone (35-65%)
									width: `${star.length * 0.8}px`,
									transformOrigin: "left center",
								}}
								initial={{
									opacity: 0,
									x: 0,
									y: 0,
									rotate: footerAngle,
								}}
								animate={{
									opacity: [0, star.intensity * 0.8, 0], // Brighter for center
									x: deltaX,
									y: deltaY,
									rotate: footerAngle,
								}}
								transition={{
									duration: SHOOTING_STAR_LIFETIME / 1000,
									ease: "easeOut",
									delay: index * 0.3, // Stagger center stars
								}}
							/>
						);
					})}

					{/* Extra Footer Sparkles */}
					{/* Left side sparkles */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "20%",
							left: "25%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.8, 0.1],
							scale: [0.3, 1.2, 0.3],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.8 + Math.random() * 1.5,
							repeat: Infinity,
							delay: Math.random() * 2,
							repeatDelay: 2 + Math.random() * 3,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>

					{/* Center area sparkles (safe in footer) */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "25%",
							left: "45%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.7, 0.1],
							scale: [0.4, 1.1, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.0 + Math.random() * 1.6,
							repeat: Infinity,
							delay: Math.random() * 2.2,
							repeatDelay: 2.2 + Math.random() * 2.8,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "40%",
							left: "55%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.3, 1.3, 0.3],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.7 + Math.random() * 2.1,
							repeat: Infinity,
							delay: Math.random() * 1.5,
							repeatDelay: 3.2 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "18%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.8, 0.1],
							scale: [0.4, 1.2, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.9 + Math.random() * 1.8,
							repeat: Infinity,
							delay: Math.random() * 2.8,
							repeatDelay: 2.5 + Math.random() * 3,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "35%",
							left: "22%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.7, 0.1],
							scale: [0.4, 1.3, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.1 + Math.random() * 1.8,
							repeat: Infinity,
							delay: Math.random() * 2.5,
							repeatDelay: 2.5 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "22%",
							left: "82%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.3, 1.4, 0.3],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.6 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 1.8,
							repeatDelay: 3 + Math.random() * 2.5,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "42%",
							left: "90%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.8, 0.1],
							scale: [0.4, 1.1, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.3 + Math.random() * 1.4,
							repeat: Infinity,
							delay: Math.random() * 3,
							repeatDelay: 2.8 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>

					{/* Dim fading stars */}
					{/* Top left footer stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "20%", left: "12%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "35%", left: "18%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 3, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "15%", left: "25%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
					/>

					{/* Top right footer stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "18%", left: "78%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "32%", left: "85%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.7, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "25%", left: "72%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 3.2, repeat: Infinity, delay: 0.1, ease: "easeInOut" }}
					/>

					{/* Far edge stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "28%", left: "5%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.4, repeat: Infinity, delay: 1.8, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "38%", left: "95%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.9, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
					/>

					{/* Bright sparkles */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "25%",
							left: "15%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.2,
							repeat: Infinity,
							delay: 0.5,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "45%",
							left: "8%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							delay: 1.2,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>

					{/* Right sparkles */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "30%",
							left: "88%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.8,
							repeat: Infinity,
							delay: 0.8,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "50%",
							left: "92%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.4,
							repeat: Infinity,
							delay: 1.8,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
				</div>

				{/* Gradient Overlay */}
				<div className='absolute inset-x-0 top-0 h-[100px] bg-gradient-to-t from-transparent to-[#040215]' />

				<motion.div
					className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:px-20 max-w-[1230px] mx-auto relative z-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
				>
					<motion.div variants={fadeInUp}>
						<h2 className='font-youth font-normal text-[28px] leading-[36px] flex items-center text-[#8AF4FF] sm:text-[40px] sm:leading-[48px]'>
							Sign up for Ignite
						</h2>
					</motion.div>
					<motion.button
						className='bg-[#8AF4FF] hover:bg-[#6ee8f5] transition-colors duration-200 flex items-center gap-3 px-8 py-4 rounded-full group'
						variants={fadeInUp}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className='font-medium text-black'>Tickets coming soon</span>
						<svg
							width='14'
							height='14'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='transition-transform duration-200 group-hover:translate-x-2'
						>
							<path d='M1 1H11M11 1V11M11 1L1 11' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
						</svg>
					</motion.button>
				</motion.div>
			</section>
		</div>
	);
}
