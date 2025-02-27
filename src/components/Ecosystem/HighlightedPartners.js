"use client";

import Container from "@/components/Container/Container";
import { highlightedPartners } from "@/data/ecosystem/highlightedPartners";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const PartnerCard = ({ title, description, image, url, chainIcon }) => (
	<div className='h-full px-2 transition-all duration-300 sm:px-7 xl:px-18'>
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 rounded-lg bg-white shadow-sm'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-t-lg bg-[#F9F9F9] flex items-center justify-center p-6'>
				<img
					src={image}
					alt={title}
					className='object-contain w-full h-full max-h-[120px] pointer-events-none select-none'
					draggable='false'
				/>
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex-1'>
					<div className='flex items-center justify-between gap-2 mb-2'>
						<h3 className='text-[26px] font-medium text-black font-youth'>{title}</h3>
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
					<p className='text-[16px]/5 text-black'>{description}</p>
				</div>
				<div className='pt-4'>
					<a
						href={url}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex text-black relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all hover:after:w-full'
					>
						<div className='inline-flex items-center justify-between w-full gap-2 group'>
							<span>Explore</span>
							<Icon
								Icon={<ArrowLongSVG />}
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

const HighlightedPartners = () => {
	const sliderRef = useRef(null);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		centerPadding: "0px",
		initialSlide: 0,
		swipeToSlide: true,
		swipe: true,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "0px",
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
					centerPadding: "0px",
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
					swipeToSlide: true,
					swipe: true,
				},
			},
		],
	};

	return (
		<section className='pt-14 pb-10 md:pt-20 md:pb-4 bg-white'>
			<Container size='lg' className='relative overflow-hidden'>
				<div className='mb-8 md:mb-[64px] lg:mb-[80px]'>
					<Display tag={"h2"} className={`text-center`} size={"sm"}>
						Highlighted Partners
					</Display>
					<p className='text-center text-sm mt-2'>Explore Celestia Ecosystem</p>
				</div>

				<div className='[&_.slick-list]:overflow-y-visible [&_.slick-list]:overflow-x-clip [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full [&_.slick-slide]:scale-100 [&_.slick-slide.slick-center]:scale-[112%] [&_.slick-slide]:transition-all [&_.slick-slide]:duration-300 [&_.slick-slide.slick-center_>_div_>_div_>div]:bg-[#F9F9F9] [&_.slick-list]:box-sizing-border-box'>
					<Slider ref={sliderRef} {...settings}>
						{highlightedPartners.map((partner) => (
							<PartnerCard key={partner.id} {...partner} />
						))}
					</Slider>
				</div>

				<div className='table mx-auto'>
					<div className='inline-flex items-center gap-4 mt-2 mb-4 md:mt-16 md:mb-10'>
						<button className='group' onClick={() => sliderRef.current?.slickPrev()}>
							<Icon
								Icon={<ArrowLongSVG />}
								hover
								HoverIcon={<ArrowLongSVG />}
								className='flex-grow-0 border-1 !border-[#413B46]'
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
								className='flex-grow-0 border-1 !border-[#413B46]'
								direction='right'
								border
								size='md'
							/>
							<span className='sr-only'>Next Slide</span>
						</button>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HighlightedPartners;
