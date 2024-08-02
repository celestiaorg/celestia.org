"use client";
import { Heading, Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";

const VerticalTitleCard = ({
  title,
  description,
  url,
  dark = false,
  verticalTitle,
}) => {
  const [minHeight, setMinHeight] = useState(0);
  const verticalTitleRef = useRef(null);

  useEffect(() => {
    if (verticalTitleRef.current) {
      setMinHeight(verticalTitleRef.current.clientWidth);
    }
  }, [verticalTitleRef]);

  return (
    <Link
      href={url}
      className={`flex min-w-[85%] md:min-w-0 md:w-full rounded-xl group border transition-colors duration-300 delay-0 ${
        dark
          ? "bg-black text-white border-white hover:border-black hover:bg-white hover:text-black"
          : "bg-white text-black border-black hover:border-white hover:bg-black hover:text-white"
      }`}
    >
      <div
        className={`w-[60px] relative border-r grow-0 shrink-0 flex items-end align-middle transition-all duration-300 ${
          dark
            ? "border-white group-hover:border-black"
            : "border-black group-hover:border-white"
        }`}
      >
        <div ref={verticalTitleRef}>
          <Heading
            tag={"h3"}
            size={"sm"}
            className={`block whitespace-nowrap -rotate-90 origin-top-left ml-2.5 -mb-2.5 transition-colors duration-300 ${
              dark
                ? "text-white group-hover:text-black"
                : "text-black group-hover:text-white"
            }`}
          >
            {verticalTitle}
          </Heading>
        </div>
      </div>
      <div
        className={`py-6 px-10 flex flex-col w-full`}
        style={{ minHeight: minHeight }}
      >
        <Icon
          Icon={<ArrowLongSVG dark={dark} />}
          hover
          HoverIcon={<ArrowLongSVG dark={dark} />}
          className={`flex-grow-0 self-end -mr-4 mb-28`}
          direction={`top-right`}
          border
          dark={dark}
          size={"lg"}
        />
        <div className={" mt-auto mb-0 self-end"}>
          {title && (
            <Heading size={"sm"} tag={"h4"} className={`mb-3`}>
              {title}
            </Heading>
          )}
          {description && (
            <Body size={"md"} className={`text-pretty`}>
              {description}
            </Body>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VerticalTitleCard;
