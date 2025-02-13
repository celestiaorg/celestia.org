"use client";

import Container from "@/components/Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Carousel.scss";

const Carousel = ({ children, hasCardGap = false, dark = false }) => {
	const sliderRef = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [slidesToShow, setSlidesToShow] = useState(2);
	const totalSlides = React.Children.count(children);

	const settings = {
		arrows: false,
		dots: false,
		infinite: true,
		speed: 400,
		slidesToShow: 2,
		slidesToScroll: 2,
		afterChange: (current) => setCurrentSlide(current),
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
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
			const width = window.innerWidth;
			if (width < 768) {
				setSlidesToShow(1);
			} else {
				setSlidesToShow(2);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const totalPages = Math.ceil(totalSlides / slidesToShow);
	const currentPage = Math.floor(currentSlide / slidesToShow) + 1;

	return (
		<Container size={"lg"} className={`${hasCardGap ? "slick-with-gap" : ""}`}>
			<Slider ref={sliderRef} {...settings}>
				{children}
			</Slider>
			<div className={"table mx-auto"}>
				<div className='inline-flex items-center gap-5 mt-6 mb-10'>
					<button className='group' onClick={() => sliderRef.current.slickPrev()}>
						<Icon
							Icon={<ArrowLongSVG dark={dark} />}
							hover
							HoverIcon={<ArrowLongSVG dark={dark} />}
							className={`flex-grow-0`}
							direction={`left`}
							border
							dark={dark}
							size={"md"}
						/>
						<span className={"sr-only"}>Previous Slide</span>
					</button>
					<div
						className={`flex flex-wrap justify-center items-center gap-1 border ${dark ? "border-white" : "border-black"} rounded-xl p-1`}
					>
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								className={`h-4 rounded-full border  transition-all hover:bg-weak ${dark ? "border-white" : "border-black"} ${
									currentPage === index + 1 ? `${dark ? "bg-white" : "bg-black"} w-8 pointer-events-none` : "w-4"
								}`}
								onClick={() => sliderRef.current.slickGoTo(index * settings.slidesToShow)}
							>
								<span className={`sr-only`}>Go to slide {index + 1}</span>
							</button>
						))}
					</div>

					<button className={`group`} onClick={() => sliderRef.current.slickNext()}>
						<Icon
							Icon={<ArrowLongSVG dark={dark} />}
							hover
							HoverIcon={<ArrowLongSVG dark={dark} />}
							className={`flex-grow-0`}
							direction={`right`}
							border
							dark={dark}
							size={"md"}
						/>
						<span className={"sr-only"}>Next Slide</span>
					</button>
				</div>
			</div>
		</Container>
	);
};

export default Carousel;
