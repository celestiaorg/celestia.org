"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
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
			staggerChildren: 0.15,
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
		<motion.div className='group flex flex-col gap-4' variants={fadeUpVariants}>
			{/* Image */}
			<a href={href} target='_blank' rel='noopener noreferrer' className='block'>
				<div className='aspect-[2000/1057] rounded-md border border-[rgba(226,232,240,0.1)] overflow-hidden'>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]'
					/>
				</div>
			</a>

			{/* Content */}
			<div className='flex flex-col gap-6'>
				<div>
					<p className='font-slussenMono text-[13px] leading-[24px] text-[#848B94]'>{date}</p>
					<div className='flex flex-col gap-2.5 mt-1'>
						<h3 className='font-slussen font-medium text-[24px] leading-[32px] tracking-[-1px] text-white line-clamp-2'>
							{title}
						</h3>
						<p className='font-slussen text-[16px] leading-[24px] text-[#B0B7C0]'>{description}</p>
					</div>
				</div>

				{/* Read More button */}
				<Button variant='pill-outline' size='pill-md' href={href} className='w-full'>
					Read More
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
				setPosts(placeholderPosts);
			}
			setIsLoading(false);
		};

		loadPosts();
	}, [isDev]);

	if (!isLoading && posts.length === 0) {
		return null;
	}

	return (
		<section data-header-theme='dark' className='bg-[#040207] py-16 md:py-20'>
			<Container size='lg'>
				<div className='flex flex-col gap-12 items-start'>
					{/* Section label */}
					<motion.h3
						className='font-slussen font-medium text-[24px] tracking-[-0.5px] text-white/35'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={fadeUpVariants}
					>
						Latest News
					</motion.h3>

					{/* Posts grid */}
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-6 w-full'>
							{[1, 2, 3].map((i) => (
								<div key={i} className='animate-pulse'>
									<div className='bg-[#28222f] aspect-[2000/1057] rounded-md mb-4' />
									<div className='h-4 bg-[#28222f] rounded w-24 mb-2' />
									<div className='h-6 bg-[#28222f] rounded w-3/4 mb-2' />
									<div className='h-4 bg-[#28222f] rounded w-full' />
								</div>
							))}
						</div>
					) : (
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-6 w-full'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-50px" }}
							variants={staggerContainer}
							key={posts.length}
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

					{/* CTA Button — centered */}
					<motion.div
						className='self-center'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeUpVariants}
					>
						<Button variant='pill-primary' size='pill-md' href='https://blog.celestia.org'>
							Visit Celestia Blog
						</Button>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default NewsSection;
