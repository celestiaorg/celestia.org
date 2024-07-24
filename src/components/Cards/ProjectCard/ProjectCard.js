import { Body } from "@/macros/Copy";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { Label } from "@/macros/Copy";
import Image from "next/image";

const ProjectCard = ({ title, description, url, dark = false, image }) => {
  return (
    <Link
      href={url || ""}
      className={`flex w-full group border-b transition-colors duration-300 delay-0 py-6 px-2 lg:px-6 gap-5 ${
        dark
          ? "bg-black text-white border-white hover:border-black hover:bg-white hover:text-black"
          : "bg-white text-black border-black hover:border-white hover:bg-black hover:text-white"
      }`}
    >
      <div
        className={`w-10 relative grow-0 shrink-0 flex items-start content-center transition-all duration-300`}
      >
        <Image
          className={`flex-grow-0 justify-self-center w-full max-w-10`}
          width={40}
          height={40}
          src={image}
          alt={`${title} logo`}
        />
      </div>
      <div className={`content-center`}>
        <Label
          tag={"h3"}
          size={"lg"}
          className={`block transition-colors duration-300 ${
            dark
              ? "text-white group-hover:text-black"
              : "text-black group-hover:text-white"
          }`}
        >
          {title}
        </Label>
        <Body size={"sm"} className={`text-pretty`}>
          {description}
        </Body>
      </div>
      <div
        className={`w-10 relative grow-0 shrink-0 flex items-start content-center transition-all duration-300`}
      >
        <Icon
          Icon={<ArrowLongSVG dark={dark} />}
          hover
          HoverIcon={<ArrowLongSVG dark={!dark} />}
          className={`flex-grow-0 shrink-0 justify-self-center group-hover:bg-white`}
          direction={`top-right`}
          border={false}
          dark={dark}
          transparentBg
          size={"40"}
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
