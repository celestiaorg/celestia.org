"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ScaledText } from "@/macros/Copy";
import "./ScrollText.scss";

const ScrollText = ({ children, lightMode = false, id }) => {
  let desktop = null;
  let mobile = null;

  // Loop through children to find ScrollText.Desktop and ScrollText.Mobile
  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case ScrollText.Desktop:
        desktop = child;
        break;
      case ScrollText.Mobile:
        mobile = child;
        break;
      default:
        break;
    }
  });

  return (
    <section
      id={id}
      className={`py-20 px-4 lg:pt-36 ${
        lightMode ? "lg:pb-16" : "lg:pb-36"
      } overflow-hidden ${
        lightMode ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {/* mobile breakpoint text */}
      {mobile}

      {/* desktop/tablet breakpoint text */}
      {desktop}
    </section>
  );
};

const AnimateScrollText = ({ children, index }) => {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: [`start ${index * 0.075 + 1}`, `start ${index * 0.075 + 0.5}`],
  });

  // This state will store the window and text width
  const [windowWidth, setWindowWidth] = useState(0); // Initialized to 0

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Now safe to use `window`

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a motion value for the blur
  const blurMotionValue = useMotionValue(0);
  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], [20, 5, 0]);

  useEffect(() => {
    const unsubscribe = blurValue.onChange((latestBlur) => {
      blurMotionValue.set(`blur(${latestBlur}px)`);
    });
    return () => unsubscribe();
  }, [blurValue, blurMotionValue]);

  // Use the `useTransform` hook to calculate the X translation based on scroll progress
  // Make sure to use the windowWidth state only after confirming the component is mounted
  const RTL = useTransform(scrollYProgress, [0, 1], [windowWidth, 0]); // Use isMounted to avoid using windowWidth before it's set
  const LTR = useTransform(scrollYProgress, [0, 1], [windowWidth * -1, 0]); // Use isMounted to avoid using windowWidth before it's set
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.span
      ref={textRef}
      className={`block relative`}
      style={{
        x: index % 2 === 0 ? RTL : LTR,
        opacity: opacity,
        filter: blurMotionValue,
      }}
    >
      {children}
    </motion.span>
  );
};

const Desktop = ({
  children,
  gradientText = false,
  gradientType = "primary",
}) => {
  return (
    <div className={`w-full hidden md:block`}>
      {children.map((child, index) => {
        return (
          <AnimateScrollText index={index} key={index}>
            <ScaledText
              key={index}
              className={`text-center font-youth ${
                gradientText ? `gradient-text-${gradientType}` : ""
              }`}
            >
              {child}
            </ScaledText>
          </AnimateScrollText>
        );
      })}
    </div>
  );
};

const Mobile = ({
  children,
  gradientText = false,
  gradientType = "primary",
}) => {
  const fontSize = calculateFontSize(children);
  return (
    <div className={`w-full block md:hidden`}>
      {children.map((child, index) => {
        return (
          <AnimateScrollText index={index} key={index}>
            <ScaledText
              key={index}
              mobileFontSize={fontSize}
              className={`text-center font-youth ${
                gradientText ? `gradient-text-${gradientType}` : ""
              }`}
            >
              {child}
            </ScaledText>
          </AnimateScrollText>
        );
      })}
    </div>
  );
};

function calculateFontSize(children) {
  // Iterate over all the children and check for any word larger than 15 characters
  let fontSize = "lg";
  console.log("children", children);
  children.forEach((child) => {
    // Split the child string into individual words using whitespace as the delimiter
    const words = child.props.children.split(" ");

    // Check if any word exceeds 15 characters
    words.forEach((word) => {
      if (word.length > 15) {
        fontSize = "sm";
      }
    });
  });

  return fontSize;
}

// Assign the subcomponents as properties of the main component
ScrollText.Mobile = Mobile;
ScrollText.Desktop = Desktop;

export default ScrollText;
