"use client";

import { Heading, Body } from "@/macros/Copy";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { useState } from "react";

const ExploreCard = ({ title, description, image, url, videoSrc }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleFocus = () => setIsHovering(true);
  const handleBlur = () => setIsHovering(false);

  return (
    <Link
      href={url}
      className="flex-shrink-0 w-[80%] block lg:flex-shrink lg:w-full lg:pb-5 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        className={`relative w-full pt-[133.33%] bg-explore-card-gradient rounded-xl overflow-hidden mb-7`}
      >
        <Image
          src={image}
          alt={""}
          width={100}
          height={100}
          className={
            "block absolute h-auto w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full min-w-full group-hover:scale-[1.5] transition-all group-hover:duration-500 group-focus:duration-500 duration-700"
          }
        />
        <div
          className={
            "h-full w-full block absolute top-[125%] skew-y-[30deg] left-0 group-hover:top-0 group-hover:skew-y-[0deg] transition-all duration-300"
          }
        >
          <VideoPlayer src={videoSrc} autoPlay={isHovering ? true : false} />
        </div>
      </div>
      <Heading tag={"h3"} className={`text-white mb-4`}>
        {title}
      </Heading>
      <Body size={"md"} className={`text-weak`}>
        {description}
      </Body>
    </Link>
  );
};

export default ExploreCard;
