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
	<div className='h-full px-3 transition-all duration-300 [@media(hover:hover)]:hover:[transform:scale(1.05)_translateY(-1.5%)]'>
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 [@media(hover:hover)]:hover:bg-[#1F1C23] rounded-lg'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-lg'>
				<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex-1'>
					<div className='flex items-center justify-between gap-2 mb-2'>
						<h3 className='text-[26px] font-medium text-white font-youth'>{title}</h3>
						{chainIcon && (
							<div className='w-[32px] h-[32px] overflow-hidden rounded-full'>
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
					<a href={url} target='_blank' rel='noopener noreferrer' className='inline-flex text-white hover:opacity-80'>
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

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		centerMode: false,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
		],
	};

	return (
		<section className='pt-20 pb-10 bg-[#17141A]'>
			<Container size='lg' className='relative'>
				<div className='mb-[57px]'>
					<Display tag={"h2"} className={`text-center text-white`} size={"sm"}>
						Apps on Celestia
					</Display>
				</div>

				<div className='[&_.slick-list]:overflow-visible [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full'>
					<Slider ref={sliderRef} {...settings}>
						{items.map((item) => (
							<AppCard key={item.id} {...item} />
						))}
					</Slider>
				</div>

				<div className='table mx-auto'>
					<div className='inline-flex items-center gap-4 mt-6 mb-10'>
						<button className='group' onClick={() => sliderRef.current?.slickPrev()}>
							<Icon
								Icon={<ArrowLongSVG dark />}
								dark
								hover
								HoverIcon={<ArrowLongSVG dark />}
								className='flex-grow-0'
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
								className='flex-grow-0'
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

export default AppsCarousel;
