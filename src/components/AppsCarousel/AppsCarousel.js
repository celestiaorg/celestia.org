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
		speed: 6000,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		centerPadding: "40px",
		initialSlide: INITIALSLIDEINDEX,
		swipeToSlide: true,
		swipe: false,
		autoplay: true,
		autoplaySpeed: 0,
		cssEase: "linear",
		pauseOnHover: false,
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
		<section className='pt-14 pb-16 md:py-20 bg-[#17141A] pr-0 md:pr-4'>
			<Container size='lg' className='relative overflow-hidden md:overflow-visible max-sm:px-0 max-w-[1680px]'>
				{/* Left navigation button */}
				{/* <button
					className='group absolute left-2 top-[30vw] lg:top-[9vw] 3xl:top-36 -translate-y-1/2 z-10 hidden md:block'
					onClick={() => sliderRef.current?.slickPrev()}
				>
					<Icon
						Icon={<ArrowLongSVG dark />}
						dark
						hover
						HoverIcon={<ArrowLongSVG dark />}
						className='flex-grow-0 border-1 !border-[#413B46] !bg-[#413B46] group-hover:!bg-white group-hover:!border-white h-[60px] w-[60px]'
						direction='left'
						border
						size='md'
					/>
					<span className='sr-only'>Previous Slide</span>
				</button> */}

				{/* Carousel */}
				<div className='[&_.slick-list]:overflow-y-visible max-md:[&_.slick-slide]:px-3 [&_.slick-list]:overflow-x-hidden md:[&_.slick-list]:overflow-x-visible [&_.slick-track]:flex max-md:[&_.slick-track]:left-[0px] [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full [&_.slick-slide]:scale-100 [&_.slick-list]:box-sizing-border-box relative max-mdpx-2 mx-0 md:mx-[-40px]'>
					<Slider ref={sliderRef} {...settings}>
						{items.map((item) => (
							<AppCard key={item.id} {...item} />
						))}
					</Slider>
				</div>

				{/* Right navigation button */}
				{/* <button
					className='group absolute right-[8px] top-[30vw] lg:top-[9vw] 3xl:top-36  -translate-y-1/2 z-10 hidden md:block'
					onClick={() => sliderRef.current?.slickNext()}
				>
					<Icon
						Icon={<ArrowLongSVG dark />}
						dark
						hover
						HoverIcon={<ArrowLongSVG dark />}
						className='flex-grow-0 border-1 !border-[#413B46] !bg-[#413B46] group-hover:!bg-white group-hover:!border-white h-[60px] w-[60px]'
						direction='right'
						border
						size='md'
					/>
					<span className='sr-only'>Next Slide</span>
				</button> */}

				{/* Mobile navigation buttons */}
				{/* <div className='flex items-center justify-center gap-4 mt-0 md:mt-6 md:hidden'>
					<button className='group' onClick={() => sliderRef.current?.slickPrev()}>
						<Icon
							Icon={<ArrowLongSVG dark />}
							dark
							hover
							HoverIcon={<ArrowLongSVG dark />}
							className='flex-grow-0 border-1 !border-[#413B46] !bg-[#413B46] group-hover:!bg-white group-hover:!border-white'
							direction='left'
							border
							size='md'
						/>
						<span className='sr-only'>Previous Slide</span>
					</button>

					<button className='group' onClick={() => sliderRef.current?.slickNext()}>
						<Icon
							Icon={<ArrowLongSVG dark />}
							dark
							hover
							HoverIcon={<ArrowLongSVG dark />}
							className='flex-grow-0 border-1 !border-[#413B46] !bg-[#413B46] group-hover:!bg-white group-hover:!border-white'
							direction='right'
							border
							size='md'
						/>
						<span className='sr-only'>Next Slide</span>
					</button>
				</div> */}

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
