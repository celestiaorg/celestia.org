"use client";

import Container from "@/components/Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const EventCard = ({ title, date, location, image, url }) => (
	<Link href={url} className='block px-3'>
		<div className='bg-white rounded-2xl overflow-hidden'>
			<div className='relative aspect-[3/2] overflow-hidden'>
				<img src={image} alt={title} className='w-full h-full object-cover transition-transform hover:scale-105 duration-300' />
			</div>
			<div className='p-6'>
				<h3 className='text-xl font-medium mb-2'>{title}</h3>
				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<span>{formatDate(date)}</span>
					<span>•</span>
					<span>{location}</span>
				</div>
			</div>
		</div>
	</Link>
);

const EventCarousel = ({ items }) => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [slidesToShow, setSlidesToShow] = useState(3);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		afterChange: (current) => setCurrentSlide(current),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setSlidesToShow(1);
			} else if (window.innerWidth < 1024) {
				setSlidesToShow(2);
			} else {
				setSlidesToShow(3);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const totalSlides = items.length;
	const canGoNext = currentSlide < totalSlides - slidesToShow;
	const canGoPrev = currentSlide > 0;

	return (
		<Container size='lg' className='relative'>
			<Slider ref={sliderRef} {...settings}>
				{items.map((item) => (
					<EventCard key={item.id} {...item} />
				))}
			</Slider>

			<div className='flex justify-end gap-2 mt-6'>
				<button
					onClick={() => sliderRef.current?.slickPrev()}
					className={`p-2 rounded-full border ${canGoPrev ? "border-black hover:bg-gray-100" : "border-gray-300 cursor-not-allowed"}`}
					disabled={!canGoPrev}
				>
					<Icon Icon={<ArrowLongSVG />} direction='left' size='md' className={!canGoPrev ? "opacity-50" : ""} />
				</button>
				<button
					onClick={() => sliderRef.current?.slickNext()}
					className={`p-2 rounded-full border ${canGoNext ? "border-black hover:bg-gray-100" : "border-gray-300 cursor-not-allowed"}`}
					disabled={!canGoNext}
				>
					<Icon Icon={<ArrowLongSVG />} direction='right' size='md' className={!canGoNext ? "opacity-50" : ""} />
				</button>
			</div>
		</Container>
	);
};

export default EventCarousel;
