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
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-sm'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-t-lg bg-[#F9F9F9] flex items-center justify-center p-6'>
				<img
					src={image}
					alt={title}
					className='object-contain w-full h-full max-h-[120px] pointer-events-none select-none'
					draggable='false'
				/>
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<h3 className='text-[26px] font-medium text-black font-youth mb-2'>{title}</h3>
				<p className='text-[16px]/5 text-black mb-4'>{description}</p>
				<div className='mt-auto'>
					<a href={url} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 text-black'>
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
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		centerMode: false,
		initialSlide: 0,
		swipeToSlide: true,
		swipe: true,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					swipeToSlide: true,
					swipe: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					swipeToSlide: true,
					swipe: true,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					swipeToSlide: true,
					swipe: true,
				},
			},
		],
	};

	return (
		<section className='pb-10 bg-white pt-14 md:pt-20 md:pb-4'>
			<Container size='lg' className='relative overflow-hidden'>
				<div className='flex items-center justify-between mb-8 md:mb-[64px]'>
					<div>
						<p className='text-sm text-black'>Explore Celestia Ecosystem</p>
						<Display tag={"h2"} className={`text-left`} size={"sm"}>
							Highlighted Partners
						</Display>
					</div>
					<div className='inline-flex items-center gap-4'>
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

				<div className='[&_.slick-list]:overflow-visible [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full'>
					<Slider ref={sliderRef} {...settings}>
						{highlightedPartners.map((partner) => (
							<PartnerCard key={partner.id} {...partner} />
						))}
					</Slider>
				</div>
			</Container>
		</section>
	);
};

export default HighlightedPartners;
