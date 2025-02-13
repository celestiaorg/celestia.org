"use client";

import Container from "@/components/Container/Container";
import { eventSlides } from "@/data/home/community-items";
import { Body, Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const CommunityCard = ({ title, description, icon, url }) => (
	<a href={url} className='flex items-center px-4 py-2 transition-all rounded-lg cursor-pointer hover:bg-gray-50'>
		<div className='flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>{icon && icon}</div>
		<div className='ml-3 sm:ml-5'>
			<div className='font-medium text-gray-900 max-sm:text-sm'>{title}</div>
			<div className='text-[12px] sm:text-sm text-black'>{description}</div>
		</div>
	</a>
);

const EventSlide = ({ title, image }) => (
	<div className='px-1'>
		<div className='relative rounded-lg overflow-hidden h-[420px] w-full lg:w-[565px] mx-auto'>
			<img src={image} alt={title} className='object-cover w-full h-full' draggable='false' />
			<div className='absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/60 to-transparent'>
				<div className='inline-block px-4 py-3 bg-white rounded-md text-[14px] leading-[17px] text-black font-medium'>{title}</div>
			</div>
		</div>
	</div>
);

const NavigationButtons = ({ sliderRef, className }) => (
	<div className={`flex gap-2 ${className}`}>
		<button className='group' onClick={() => sliderRef.current?.slickPrev()}>
			<Icon
				Icon={<ArrowLongSVG />}
				hover
				HoverIcon={<ArrowLongSVG />}
				className='flex-grow-0 border border-gray-200 hover:border-gray-300'
				direction='left'
				border
				size='md'
			/>
			<span className='sr-only'>Previous Slide</span>
		</button>
		<button className='group' onClick={() => sliderRef.current?.slickNext()}>
			<Icon
				Icon={<ArrowLongSVG />}
				hover
				HoverIcon={<ArrowLongSVG />}
				className='flex-grow-0 border border-gray-200 hover:border-gray-300'
				direction='right'
				border
				size='md'
			/>
			<span className='sr-only'>Next Slide</span>
		</button>
	</div>
);

const CommunityCarousel = ({ items }) => {
	const sliderRef = useRef(null);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		variableWidth: true,
		swipeToSlide: true,
		centerMode: false,
		centerPadding: "0px",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					variableWidth: false,
					adaptiveHeight: true,
					centerPadding: "0px",
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					variableWidth: false,
					adaptiveHeight: true,
					centerPadding: "12px",
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
				},
			},
		],
	};

	return (
		<section className='w-full pt-12 pb-12 bg-white lg:py-[100px]'>
			<Container size='lg'>
				<Display tag='h2' className='mb-4 text-gray-900 max-lg:text-center' size='sm'>
					Join the community
				</Display>
				<div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-6 sm:mb-[44px] gap-4'>
					<Body size={"lg"} className={"leading-[1.7em] max-lg:text-center max-lg:max-w-[540px] max-lg:mx-auto"}>
						Join the Celestia community online or hang out at one of the grassroots Modular Meetups
					</Body>
					<NavigationButtons sliderRef={sliderRef} className='self-end hidden lg:flex sm:self-auto' />
				</div>

				<div className='flex flex-col gap-8 lg:gap-2 lg:flex-row'>
					{/* Social Links Column */}
					<div className='w-full lg:w-[260px] flex-shrink-0 bg-white rounded-lg border border-gray-200 px-1 py-2 md:py-6 lg:px-4 lg:py-2 h-auto lg:h-[420px] shadow-sm flex items-center'>
						<div className='grid w-full grid-cols-2 sm:gap-1 lg:grid-cols-1'>
							{items.map((item) => (
								<CommunityCard key={item.id} {...item} />
							))}
						</div>
					</div>

					{/* Carousel Column */}
					<div className='flex-1 overflow-hidden lg:mr-[-50vw] rounded-lg'>
						<div className='[&_.slick-list]:lg:overflow-visible [&_.slick-track]:flex [&_.slick-slide]:h-[420px] [&_.slick-slide>div]:h-full [&_.slick-slide]:transition-all'>
							<Slider ref={sliderRef} {...settings}>
								{eventSlides.map((slide, index) => (
									<EventSlide key={index} {...slide} />
								))}
							</Slider>
						</div>
					</div>

					{/* Mobile Navigation Buttons */}
					<NavigationButtons sliderRef={sliderRef} className='flex justify-center lg:mt-4 lg:hidden' />
				</div>
			</Container>
		</section>
	);
};

export default CommunityCarousel;
