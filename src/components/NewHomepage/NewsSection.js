"use client";

import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

// Arrow icon for "Read More" link
const ArrowIcon = () => (
	<svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M1 9L9 1M9 1H1M9 1V9' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

// Blog post card component
const PostCard = ({ image, date, title, description, href }) => {
	return (
		<a href={href} className='group flex flex-col gap-4 rounded-lg'>
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
		</a>
	);
};

const NewsSection = () => {
	// Placeholder blog posts - these would typically come from an API or CMS
	const posts = [
		{
			image: "/images/placeholder.jpg",
			date: "2025.12.18.",
			title: "Blog Post Title",
			description: "The first onchain bank, built on a privacy blockchain with stablecoins.",
			href: "https://blog.celestia.org",
		},
		{
			image: "/images/placeholder.jpg",
			date: "2025.12.18.",
			title: "Blog Post Title",
			description: "The first onchain bank, built on a privacy blockchain with stablecoins.",
			href: "https://blog.celestia.org",
		},
		{
			image: "/images/placeholder.jpg",
			date: "2025.12.18.",
			title: "Blog Post Title",
			description: "The first onchain bank, built on a privacy blockchain with stablecoins.",
			href: "https://blog.celestia.org",
		},
	];

	return (
		<section data-header-theme='light' className='bg-[#f6f6f6] py-[60px] md:py-[80px]'>
			<Container size='lg'>
				<div className='flex flex-col gap-[40px] md:gap-[56px] items-center'>
					{/* Title */}
					<h2 className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-0.07em] text-[#17141a]'>
						Latest News
					</h2>

					{/* Posts grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[39px] w-full'>
						{posts.map((post, index) => (
							<PostCard
								key={index}
								image={post.image}
								date={post.date}
								title={post.title}
								description={post.description}
								href={post.href}
							/>
						))}
					</div>

					{/* CTA Button */}
					<PrimaryButton href='https://blog.celestia.org' lightMode size='xl' className='border border-black'>
						Visit Celestia Blog
					</PrimaryButton>
				</div>
			</Container>
		</section>
	);
};

export default NewsSection;
