"use client";

import Container from "@/components/Container/Container";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const AppCard = ({ title, description, image, url, chainIcon }) => (
	<div className='h-full transition-all duration-300 sm:px-3 xl:px-4'>
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 rounded-lg'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-lg'>
				<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex-1'>
					<div className='flex items-center justify-between gap-2 mb-2'>
						<h3 className='text-[26px] font-medium text-white font-youth'>{title}</h3>
						{chainIcon && (
							<div className='flex-shrink-0 w-[32px] h-[32px] overflow-hidden rounded-full'>
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

const AppsCarousel = ({ items }) => {
	const sliderRef = useRef(null);

	// Find index of first item with initialSlide: true (or default to 0)
	const INITIALSLIDEINDEX = items.findIndex((item) => item.initialSlide) ?? 0;

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		centerPadding: "40px",
		initialSlide: INITIALSLIDEINDEX,
		swipeToSlide: true,
		swipe: true,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "40px",
					infinite: true,
					swipeToSlide: true,
					swipe: true,
				},
			},
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "30px",
					infinite: true,
					swipeToSlide: true,
					swipe: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: "0px",
					infinite: true,
					initialSlide: INITIALSLIDEINDEX,
					swipeToSlide: true,
					swipe: true,
				},
			},
		],
	};

	return (
		<section className='pt-14 pb-10 md:py-20 bg-[#17141A]'>
			<Container size='lg' className='relative overflow-hidden md:overflow-visible'>
				<div className='[&_.slick-list]:overflow-y-visible [&_.slick-list]:overflow-x-hidden md:[&_.slick-list]:overflow-x-visible [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full [&_.slick-slide]:scale-100 [&_.slick-slide.slick-center]:scale-[112%] [&_.slick-slide]:transition-all [&_.slick-slide]:duration-300 [&_.slick-slide.slick-center_>_div_>_div_>div]:bg-[#1F1C23] [&_.slick-list]:box-sizing-border-box relative mx-0 md:mx-[-40px]'>
					{/* Left navigation button */}
					<button className='group absolute left-2 top-1/2 -translate-y-1/2 z-10' onClick={() => sliderRef.current?.slickPrev()}>
						<Icon
							Icon={<ArrowLongSVG dark />}
							dark
							hover
							HoverIcon={<ArrowLongSVG dark />}
							className='flex-grow-0 border-1 !border-[#413B46] bg-[#17141A]/80'
							direction='left'
							border
							size='md'
						/>
						<span className='sr-only'>Previous Slide</span>
					</button>

					<Slider ref={sliderRef} {...settings}>
						{items.map((item) => (
							<AppCard key={item.id} {...item} />
						))}
					</Slider>

					{/* Right navigation button */}
					<button className='group absolute right-2 top-1/2 -translate-y-1/2 z-10' onClick={() => sliderRef.current?.slickNext()}>
						<Icon
							Icon={<ArrowLongSVG dark />}
							dark
							hover
							HoverIcon={<ArrowLongSVG dark />}
							className='flex-grow-0 border-1 !border-[#413B46] bg-[#17141A]/80'
							direction='right'
							border
							size='md'
						/>
						<span className='sr-only'>Next Slide</span>
					</button>
				</div>

				<div className='mt-[40px]'>
					<Display tag={"h2"} className={`text-center text-white`} size={"sm"}>
						Celestia underneath
					</Display>
				</div>
			</Container>
		</section>
	);
};

export default AppsCarousel;
