"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import { Button } from "@/components/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

// Format date from Ghost API (e.g., "2025-01-10T12:00:00.000Z" -> "2025.01.10.")
const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}.${month}.${day}.`;
};

// Truncate excerpt to a reasonable length
const truncateExcerpt = (text, maxLength = 100) => {
	if (!text) return "";
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + "...";
};

// Blog post card component
const PostCard = ({ image, date, title, description, href }) => {
	return (
		<motion.div className='flex flex-col gap-4 rounded-lg' variants={fadeUpVariants}>
			{/* Image */}
			<a href={href} target='_blank' rel='noopener noreferrer' className='block'>
				<div className='aspect-[16/10] rounded-[24px] overflow-hidden border border-[rgba(226,232,240,0.1)]'>
					<img src={image} alt={title} className='w-full h-full object-cover' />
				</div>
			</a>

			{/* Content */}
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-3'>
					<p className='font-untitledSans text-[13px] leading-[24px] text-[#d6d6d6]'>{date}</p>
					<div className='flex flex-col gap-2.5'>
						<h3 className='font-untitledSans font-medium text-[20px] md:text-[24px] leading-[1.33] tracking-[-0.04em] text-white'>
							{title}
						</h3>
						<p className='font-untitledSans text-[14px] md:text-[16px] leading-[24px] text-[#f5edfe]'>{description}</p>
					</div>
				</div>

				{/* Read More button */}
				<Button variant='subtle' size='xs' href={href} className='w-fit'>
					Read More <ArrowRightSVG />
				</Button>
			</div>
		</motion.div>
	);
};

// Ghost API configuration from environment variables
const GHOST_API_URL = process.env.NEXT_PUBLIC_GHOST_API_URL || "https://blog.celestia.org";
const GHOST_API_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

// Fetch posts from Ghost CMS
const fetchPosts = async () => {
	if (!GHOST_API_KEY) {
		console.warn("Ghost API key not configured. Set NEXT_PUBLIC_GHOST_CONTENT_API_KEY in environment.");
		return null;
	}

	try {
		const res = await fetch(
			`${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&limit=3&fields=title,feature_image,url,excerpt,published_at`,
			{
				headers: {
					"Accept-Version": "v5.0",
					Accept: "application/json",
				},
			}
		);

		if (!res.ok) {
			if (res.status === 401) {
				console.warn("Ghost API authentication failed - API key may be invalid");
			}
			return null;
		}

		const responseJson = await res.json();
		return responseJson.posts || null;
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		return null;
	}
};

// Placeholder posts for development
const placeholderPosts = [
	{
		feature_image: "/images/placeholder.jpg",
		published_at: "2025-01-10T12:00:00.000Z",
		title: "Blog Post Title One",
		excerpt: "This is a placeholder blog post excerpt that shows how the card will look with real content from the Ghost API.",
		url: "https://blog.celestia.org",
	},
	{
		feature_image: "/images/placeholder.jpg",
		published_at: "2025-01-08T12:00:00.000Z",
		title: "Blog Post Title Two",
		excerpt: "Another placeholder excerpt demonstrating the layout and typography of the news section cards.",
		url: "https://blog.celestia.org",
	},
	{
		feature_image: "/images/placeholder.jpg",
		published_at: "2025-01-05T12:00:00.000Z",
		title: "Blog Post Title Three",
		excerpt: "The third placeholder post to show how the grid layout looks with multiple items in the news section.",
		url: "https://blog.celestia.org",
	},
];

const NewsSection = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const isDev = process.env.NODE_ENV === "development";

	useEffect(() => {
		const loadPosts = async () => {
			const fetchedPosts = await fetchPosts();
			if (fetchedPosts) {
				setPosts(fetchedPosts);
			} else if (isDev) {
				// Use placeholder posts in development when API fails
				setPosts(placeholderPosts);
			}
			setIsLoading(false);
		};

		loadPosts();
	}, [isDev]);

	// In production, don't render section if no posts
	// In development, we'll have placeholder posts
	if (!isLoading && posts.length === 0) {
		return null;
	}

	return (
		<section data-header-theme='dark' className='bg-[#17141a] py-[60px] md:py-[80px]'>
			<Container size='lg'>
				<div className='flex flex-col gap-[40px] md:gap-[48px] items-center'>
					{/* Title */}
					<motion.h2
						className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-[1] tracking-[-0.0625em] text-white'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeUpVariants}
					>
						Latest News
					</motion.h2>

					{/* Posts grid */}
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
							{[1, 2, 3].map((i) => (
								<div key={i} className='animate-pulse'>
									<div className='bg-[#28222f] h-[180px] md:h-[240px] rounded-[24px] mb-4' />
									<div className='h-4 bg-[#28222f] rounded w-24 mb-2' />
									<div className='h-6 bg-[#28222f] rounded w-3/4 mb-2' />
									<div className='h-4 bg-[#28222f] rounded w-full' />
								</div>
							))}
						</div>
					) : (
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
						>
							{posts.map((post, index) => (
								<PostCard
									key={index}
									image={post.feature_image}
									date={formatDate(post.published_at)}
									title={post.title}
									description={truncateExcerpt(post.excerpt)}
									href={post.url}
								/>
							))}
						</motion.div>
					)}

					{/* CTA Button */}
					<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants}>
						<Button variant='subtle' size='md' href='https://blog.celestia.org'>
							Visit Celestia Blog <ArrowRightSVG />
						</Button>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default NewsSection;
