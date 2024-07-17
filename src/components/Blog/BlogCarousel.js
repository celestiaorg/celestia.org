"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BlogCarousel.scss";
import Slider from "react-slick";
import { useRef, useState, useEffect } from "react";
import Container from "../Container/Container";

const BlogCarousel = ({ children }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const totalSlides = React.Children.count(children);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 2,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
      } else if (width < 1440) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(totalSlides / slidesToShow);
  const currentPage = Math.floor(currentSlide / slidesToShow) + 1;

  return (
    <Container size={"lg"}>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      <button
        className="p-10 border border-black block"
        onClick={() => sliderRef.current.slickPrev()}
      >
        Previous
      </button>
      <div className="flex justify-center items-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`p-2 border border-black ${
              currentPage === index + 1 ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() =>
              sliderRef.current.slickGoTo(index * settings.slidesToShow)
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="p-10 border border-black block"
        onClick={() => sliderRef.current.slickNext()}
      >
        Next
      </button>
    </Container>
  );
};

export default BlogCarousel;
