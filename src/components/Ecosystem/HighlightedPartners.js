"use client";

import Container from "@/components/Container/Container";
import { highlightedPartners } from "@/data/ecosystem/highlightedPartners";
import GhostButton from "@/macros/Buttons/GhostButton";
import { Display } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const PartnerCard = ({ title, description, image, url, chainIcon, chainIconLink }) => (
	<div className='h-full pr-4 w-[300px] md:w-[320px] lg:w-[340px]'>
		<div className='flex flex-col min-h-full overflow-hidden transition-all duration-300 bg-white'>
			<div className='w-full aspect-[400/240] overflow-hidden rounded-lg'>
				<img src={image} alt={title} className='object-cover w-full h-full pointer-events-none select-none' draggable='false' />
			</div>

			<div className='flex flex-col flex-1 p-6'>
				<div className='flex items-center justify-between gap-2 mb-2'>
					<h3 className='text-[26px] font-medium text-black font-youth'>{title}</h3>
					{chainIcon && (
						<div className='flex-shrink-0 w-[32px] h-[32px] overflow-hidden rounded-full'>
							<a
								href={chainIconLink}
								target='_blank'
								rel='noopener noreferrer'
								className='transition-opacity duration-200 hover:opacity-80'
								data-external-link='true'
							>
								<img
									src={chainIcon}
									alt='chain icon'
									className='object-cover w-full h-full pointer-events-none select-none'
									draggable='false'
								/>
							</a>
						</div>
					)}
				</div>
				<p className='text-[16px]/5 text-black mb-2'>{description}</p>
				<div className='mt-auto'>
					<GhostButton href={url} className='inline-flex'>
						Explore
					</GhostButton>
				</div>
			</div>
		</div>
	</div>
);

const HighlightedPartners = () => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	// Simple function to check navigation state
	const checkNavigation = (index) => {
		// Check if we're at the beginning
		setIsBeginning(index === 0);

		// Check if we're at the end
		// For variable width, we need to calculate based on total slides and visible slides
		let visibleSlides = 4;
		if (typeof window !== "undefined") {
			if (window.innerWidth < 640) visibleSlides = 1;
			else if (window.innerWidth < 1024) visibleSlides = 2;
			else if (window.innerWidth < 1500) visibleSlides = 3;
		}

		// We're at the end if current index + visible slides >= total slides
		setIsEnd(index + visibleSlides >= highlightedPartners.length);
	};

	// Check navigation on window resize
	useEffect(() => {
		const handleResize = () => {
			checkNavigation(currentSlide);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [currentSlide]);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		centerMode: false,
		initialSlide: 0,
		swipeToSlide: true,
		swipe: true,
		variableWidth: true,
		beforeChange: (current, next) => {
			setCurrentSlide(next);
			checkNavigation(next);
		},
		afterChange: (current) => {
			setCurrentSlide(current);
			checkNavigation(current);
		},
		onInit: () => {
			// Check initial navigation state
			setTimeout(() => checkNavigation(0), 100);
		},
		onReInit: () => {
			// Update navigation state after reinit
			setTimeout(() => checkNavigation(currentSlide), 100);
		},
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: false,
					swipeToSlide: true,
					swipe: true,
					variableWidth: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: false,
					swipeToSlide: true,
					swipe: true,
					variableWidth: true,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
					swipeToSlide: true,
					swipe: true,
					variableWidth: true,
				},
			},
		],
	};

	return (
		<section className='pb-10 overflow-hidden bg-white md:pb-4' data-header-theme='light'>
			<Container size='lg' className='relative'>
				<div className='flex items-center justify-between mb-8 md:mb-[64px]'>
					<div>
						<Display tag={"h2"} className={`text-left`} size={"sm"}>
							Highlighted apps
						</Display>
					</div>
					{/* Desktop navigation - visible on md and up */}
					<div className='items-center hidden gap-4 md:inline-flex'>
						<button
							className={`group ${isBeginning ? "opacity-50 cursor-not-allowed" : ""}`}
							onClick={() => !isBeginning && sliderRef.current?.slickPrev()}
							disabled={isBeginning}
						>
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

						<button
							className={`group ${isEnd ? "opacity-50 cursor-not-allowed" : ""}`}
							onClick={() => !isEnd && sliderRef.current?.slickNext()}
							disabled={isEnd}
						>
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

				<div className='[&_.slick-list]:overflow-visible [&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full [&_.slick-track]:ml-0'>
					<Slider ref={sliderRef} {...settings}>
						{highlightedPartners.map((partner) => (
							<PartnerCard key={partner.id} {...partner} />
						))}
					</Slider>
				</div>

				{/* Mobile navigation - visible only on small screens */}
				<div className='flex justify-center md:hidden'>
					<div className='inline-flex items-center gap-4'>
						<button
							className={`group ${isBeginning ? "opacity-50 cursor-not-allowed" : ""}`}
							onClick={() => !isBeginning && sliderRef.current?.slickPrev()}
							disabled={isBeginning}
						>
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

						<button
							className={`group ${isEnd ? "opacity-50 cursor-not-allowed" : ""}`}
							onClick={() => !isEnd && sliderRef.current?.slickNext()}
							disabled={isEnd}
						>
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
