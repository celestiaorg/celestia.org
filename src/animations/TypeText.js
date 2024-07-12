"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypeText = ({ message }) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);

  // break up the error message into an array of characters
  const messageArray = message ? message.split("") : [];

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, [message]);

  return (
    <AnimatePresence>
      <motion.small
        className={`overflow-hidden`}
        initial={{ height: 0 }}
        animate={{ height: height || "auto" }}
        exit={{ height: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {messageArray.map((char, index) => {
          return (
            <motion.span
              className="inline-block"
              key={`${char}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                x:
                  index === messageArray.length - 1
                    ? [0, messageArray.length, 0]
                    : 0,
                transition: {
                  opacity: {
                    delay: 0.75 + index * 0.02,
                    duration: 0.25,
                    ease: "backOut",
                  },
                  y: {
                    delay: 0.75 + index * 0.02,
                    duration: 0.25,
                    ease: "backOut",
                  },
                  x: {
                    delay: 0.8 + index * 0.02, // Delay `x` more than `y`
                    duration: 0.4,
                    times: [0, 0.5, 1],
                    ease: "backOut",
                  },
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.small>
    </AnimatePresence>
  );
};

export default TypeText;
