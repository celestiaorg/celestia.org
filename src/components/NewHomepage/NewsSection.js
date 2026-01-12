"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

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

// Arrow icon for "Read More" link
const ArrowIcon = () => (
	<svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M1 9L9 1M9 1H1M9 1V9' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

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
		<motion.a href={href} target='_blank' rel='noopener noreferrer' className='group flex flex-col gap-4 rounded-lg' variants={fadeUpVariants}>
			{/* Image */}
			<div className='bg-white h-[200px] md:h-[240px] rounded-lg overflow-hidden'>
				<img src={image} alt={title} className='w-full h-full object-cover' />
			</div>

			{/* Content */}
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<p className='font-untitledSans text-[13px] leading-[24px] text-[#747474]'>{date}</p>
					<h3 className='font-untitledSans font-medium text-[22px] md:text-[28px] leading-tight tracking-[-0.03em] text-[#17141a]'>
						{title}
					</h3>
					<p className='font-untitledSans text-[16px] md:text-[18px] leading-[1.33] text-[#17141a]'>{description}</p>
				</div>

				{/* Read More link */}
				<div className='flex items-center gap-4 group-hover:gap-5 transition-all'>
					<span className='font-untitledSans font-medium text-[16px] leading-[23px] tracking-[0.225px] text-[#17141a]'>
						Read More
					</span>
					<ArrowIcon />
				</div>
			</div>
		</motion.a>
	);
};

// Fetch posts from Ghost CMS (same as old homepage)
const fetchPosts = async () => {
	try {
		const res = await fetch(
			"https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=3&fields=title,text,feature_image,url,excerpt,published_at&formats=plaintext"
		);

		if (!res.ok) {
			return null;
		}

		const responseJson = await res.json();
		return responseJson.posts || null;
	} catch (error) {
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
		<section data-header-theme='light' className='bg-[#f6f6f6] py-[60px] md:py-[80px]'>
			<Container size='lg'>
				<div className='flex flex-col gap-[40px] md:gap-[56px] items-center'>
					{/* Title */}
					<motion.h2
						className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-0.07em] text-[#17141a]'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeUpVariants}
					>
						Latest News
					</motion.h2>

					{/* Posts grid */}
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[39px] w-full'>
							{[1, 2, 3].map((i) => (
								<div key={i} className='animate-pulse'>
									<div className='bg-gray-300 h-[200px] md:h-[240px] rounded-lg mb-4' />
									<div className='h-4 bg-gray-300 rounded w-24 mb-2' />
									<div className='h-6 bg-gray-300 rounded w-3/4 mb-2' />
									<div className='h-4 bg-gray-300 rounded w-full' />
								</div>
							))}
						</div>
					) : (
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[39px] w-full'
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
					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeUpVariants}
					>
						<PrimaryButton href='https://blog.celestia.org' lightMode size='xl' className='border border-black'>
							Visit Celestia Blog
						</PrimaryButton>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default NewsSection;
