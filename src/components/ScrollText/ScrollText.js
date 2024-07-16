"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScaledText } from "@/macros/Copy";

const ScrollText = ({
  className = "",
  children,
  startPos = 0,
  endPos = 100,
  lightMode = false,
}) => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
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

  // Use the `useTransform` hook to calculate the X translation based on scroll progress
  // Make sure to use the windowWidth state only after confirming the component is mounted
  const xTranslation = useTransform(
    scrollYProgress,
    [0, 1],
    [(windowWidth / 100) * startPos, (windowWidth / 100) * endPos]
  ); // Use isMounted to avoid using windowWidth before it's set

  const altTranslation = useTransform(
    scrollYProgress,
    [0, 1],
    [(windowWidth / 100) * endPos, (windowWidth / 100) * startPos]
  ); // Use isMounted to avoid using windowWidth before it's set

  return (
    <section
      className={`py-20 px-4 lg:py-36 ${
        lightMode ? "bg-white-weak text-black" : "bg-black text-white"
      }`}
    >
      <span ref={ref} className={`w-full block`}>
        {children.map((child, index) => {
          return (
            <motion.span
              ref={textRef}
              className={`block relative whitespace-nowrap ${className}`}
              style={{ x: index % 2 === 0 ? xTranslation : altTranslation }}
              key={index}
            >
              <ScaledText key={index}>{child}</ScaledText>
            </motion.span>
          );
        })}
      </span>
    </section>
  );
};

export default ScrollText;
