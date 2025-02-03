"use client";

import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const AppCard = ({ title, description, image, url }) => (
	<div className='h-full px-3'>
		<div className='flex flex-col min-h-full overflow-hidden transition-colors bg-white border border-gray-100 rounded-2xl hover:border-gray-200'>
			<div className='w-full h-[240px] overflow-hidden'>
				<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex-1'>
					<h3 className='mb-2 text-xl font-medium'>{title}</h3>
					<p className='text-sm text-gray-600'>{description}</p>
				</div>
				<div className='pt-4'>
					<PrimaryButton href={url} size='md' lightMode className='table' self='_blank'>
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
					</PrimaryButton>
				</div>
			</div>
		</div>
	</div>
);

const AppsCarousel = ({ items }) => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [slidesToShow, setSlidesToShow] = useState(3);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		centerMode: false,
		initialSlide: 0,
		afterChange: (current) => setCurrentSlide(current),
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

	return (
		<section className='py-20 bg-gray-50'>
			<Container size='lg' className='relative'>
				<div className='mb-12'>
					<Display tag={"h2"} className={`text-center`} size={"sm"}>
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
								Icon={<ArrowLongSVG />}
								hover
								HoverIcon={<ArrowLongSVG />}
								className='flex-grow-0'
								direction='left'
								border
								size='md'
							/>
							<span className='sr-only'>Previous Slide</span>
						</button>

						{/* <div className='flex flex-wrap items-center justify-center gap-1 p-1 border border-black rounded-xl'>
						{Array.from({ length: Math.ceil(items.length / slidesToShow) }).map((_, index) => (
							<button
								key={index}
								className={`h-4 rounded-full border border-black transition-all hover:bg-weak ${
									Math.floor(currentSlide / slidesToShow) === index ? "bg-black w-8 pointer-events-none" : "w-4"
								}`}
								onClick={() => sliderRef.current?.slickGoTo(index * slidesToShow)}
							>
								<span className='sr-only'>Go to slide {index + 1}</span>
							</button>
						))}
					</div> */}

						<button className='group' onClick={() => sliderRef.current?.slickNext()}>
							<Icon
								Icon={<ArrowLongSVG />}
								hover
								HoverIcon={<ArrowLongSVG />}
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
