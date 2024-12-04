"use client";
import { Heading, Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";
import MovingGradients from "@/components/Animation/MovingGradient/MovingGradient";
import { motion, AnimatePresence } from "framer-motion";

const VerticalTitleCard = ({
  title,
  titleClamp = null,
  description,
  descriptionClamp = null,
  url,
  dark = false,
  verticalTitle,
}) => {
  const [minHeight, setMinHeight] = useState(0);
  const verticalTitleRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (url) {
      setIsHovering(true);
    }
  };
  const handleMouseLeave = () => {
    if (url) {
      setIsHovering(false);
    }
  };
  const handleFocus = () => {
    if (url) {
      setIsHovering(true);
    }
  };
  const handleBlur = () => {
    if (url) {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    if (verticalTitleRef.current) {
      setMinHeight(verticalTitleRef.current.clientWidth + 3 * 16); // 3rem vertical padding
    }
  }, [verticalTitleRef]);

  const Tag = url ? Link : "div";

  return (
    <Tag
      href={url}
      className={`flex min-w-[85%] md:min-w-0 md:w-full rounded-xl  border transition-colors duration-300 delay-0 relative overflow-hidden  ${
        dark
          ? "bg-black text-white border-white"
          : "bg-white text-black border-black"
      }
      ${url ? "md:group md:hover:border-black md:hover:text-black" : ""}
      `}
      style={{ minHeight: minHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
          >
            <MovingGradients />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`w-[60px] relative border-r grow-0 shrink-0 flex items-end align-middle transition-all duration-300 md:group-hover:border-black z-10 ${
          dark ? "border-white" : "border-black"
        }`}
      >
        <div ref={verticalTitleRef}>
          <Heading
            tag={"h3"}
            size={"sm"}
            className={`block whitespace-nowrap -rotate-90 origin-top-left ml-2.5 -mb-2.5 transition-colors duration-300 md:group-hover:text-black ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {verticalTitle}
          </Heading>
        </div>
      </div>
      <div className={`py-6 px-10 flex flex-col w-full z-10`}>
        {url && (
          <Icon
            Icon={<ArrowLongSVG dark={true} />}
            hover
            dark
            HoverIcon={<ArrowLongSVG dark={false} />}
            className={`flex-grow-0 self-end -mr-4 mb-28 md:group-hover:!bg-black`}
            direction={`top-right`}
            border
            size={"lg"}
          />
        )}
        <div className={"mt-auto mb-0 self-end"}>
          {title && (
            <Heading
              size={"sm"}
              tag={"h4"}
              className={`text-pretty mb-3 ${
                titleClamp ? `line-clamp-${titleClamp}` : ""
              }`}
            >
              {title}
            </Heading>
          )}
          {description && (
            <Body
              size={"md"}
              className={`text-pretty ${
                descriptionClamp ? `line-clamp-${descriptionClamp}` : ""
              }`}
            >
              {description}
            </Body>
          )}
        </div>
      </div>
    </Tag>
  );
};

export default VerticalTitleCard;
