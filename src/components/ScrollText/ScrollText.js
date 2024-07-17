"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ScaledText } from "@/macros/Copy";

const ScrollText = ({ children, lightMode = false }) => {
  return (
    <section
      className={`py-20 px-4 lg:pt-36 ${
        lightMode ? "lg:pb-16" : "lg:pb-36"
      } overflow-hidden ${
        lightMode ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className={`w-full block`}>
        {children.map((child, index) => {
          return (
            <AnimateScrollText index={index} key={index}>
              <ScaledText key={index} className={"text-center"}>
                {child}
              </ScaledText>
            </AnimateScrollText>
          );
        })}
      </div>
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
    // Only run the following code if we're in the browser
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth); // Now safe to use `window`

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
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

export default ScrollText;
