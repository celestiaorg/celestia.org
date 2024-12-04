"use client";

import React, { useEffect, useState } from "react";
import { Heading, Body } from "@/macros/Copy";
import Image from "next/image";
import Link from "@/macros/Link/Link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import MovingGradients from "@/components/Animation/MovingGradient/MovingGradient";
import "./ExploreCard.scss";

const ExploreCard = ({ title, description, image, url }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleFocus = () => setIsHovering(true);
  const handleBlur = () => setIsHovering(false);

  return (
    <Link
      href={url}
      className="flex-shrink-0 w-[80%] block lg:flex-shrink lg:w-full lg:pb-5 group "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        className={`relative w-full pt-[133.33%] bg-purple-weak rounded-xl overflow-hidden mb-7`}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <MovingGradients />
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src={image}
          alt={""}
          width={100}
          height={100}
          className={
            "block absolute h-auto w-7/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-[1.1] transition-all group-hover:duration-500 group-focus:duration-500 duration-700"
          }
        />

        <div
          className={
            "absolute top-6 right-6 scale-0 group-hover:scale-100 transition-transform  group-hover:duration-200 group-hover:delay-150 ease-out duration-500"
          }
        >
          <Icon
            Icon={<ArrowLongSVG dark />}
            hover
            HoverIcon={<ArrowLongSVG />}
            className={`flex-grow-0`}
            direction={`top-right`}
            border={false}
            size={"lg"}
          />
        </div>
      </div>
      <Heading tag={"h3"} size={"md"} className={`text-white mb-4`}>
        {title}
      </Heading>
      <Body size={"md"} className={`text-weak`}>
        {description}
      </Body>
    </Link>
  );
};

export default ExploreCard;
