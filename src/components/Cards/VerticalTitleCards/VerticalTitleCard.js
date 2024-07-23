"use client";
import { Heading, Body } from "@/macros/Copy";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";

const VerticalTitleCard = ({ title, description, url, dark = false }) => {
  const [minHeight, setMinHeight] = useState(0);
  const verticalTitleRef = useRef(null);

  useEffect(() => {
    console.log(verticalTitleRef.current);
    if (verticalTitleRef.current) {
      setMinHeight(verticalTitleRef.current.clientWidth);
    }
  }, [verticalTitleRef]);

  return (
    <Link
      href={url}
      className={`flex w-full rounded-xl group border ${
        dark
          ? "bg-black text-white border-black"
          : "bg-white text-black border-white"
      }`}
    >
      <div
        className={`w-[60px] relative border-r grow-0 shrink-0 px-4 py-6 flex items-end align-middle ${
          dark ? "border-white" : "border-black"
        }`}
      >
        <div ref={verticalTitleRef}>
          <Heading
            tag={"h3"}
            size={"sm"}
            className={"block whitespace-nowrap -rotate-90 origin-left"}
          >
            {title}
          </Heading>
        </div>
      </div>
      <div
        className={`py-6 px-10 flex flex-col`}
        style={{ minHeight: minHeight }}
      >
        <Icon
          Icon={<ArrowLongSVG />}
          hover
          HoverIcon={<ArrowLongSVG />}
          className={`flex-grow-0 self-end -mr-4 mb-28`}
          direction={`top-right`}
          border
          size={"lg"}
        />
        <Body size={"md"} className={`text-pretty mt-auto mb-0 self-end`}>
          {description}
        </Body>
      </div>
    </Link>
  );
};

export default VerticalTitleCard;
