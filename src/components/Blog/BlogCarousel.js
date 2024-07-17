"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import Image from "next/image";

const BlogCarousel = ({ children }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      <button onClick={() => sliderRef.current.slickPrev()}>Previous</button>
      <button onClick={() => sliderRef.current.slickNext()}>Next</button>
    </>
  );
};

export default BlogCarousel;
