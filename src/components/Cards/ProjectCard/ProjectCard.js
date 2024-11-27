import { Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { Label } from "@/macros/Copy";
import Image from "next/image";
import CategoryPill from "@/macros/Pills/CategoryPill";
import { motion } from "framer-motion";
import { stringToId } from "@/utils/stringToId";

const ProjectCard = ({
  title,
  description,
  url,
  dark = false,
  image,
  categories = [],
}) => {
  const Tag = url ? Link : "div";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      id={stringToId(title)}
    >
      <Tag
        href={url || ""}
        className={`flex w-full group border-b transition-colors hover:duration-100 group-hover:duration-100 duration-300 delay-0 py-6 px-2 lg:px-6 gap-5 min-h-[100px] ${
          dark
            ? "bg-black text-white border-white hover:border-black hover:bg-white hover:text-black"
            : "bg-white text-black border-black hover:border-white hover:bg-black hover:text-white"
        }`}
      >
        <div
          className={`w-10 relative grow-0 shrink-0 flex items-start content-center transition-all hover:duration-100 group-hover:duration-100 duration-300`}
        >
          <Image
            className={`flex-grow-0 justify-self-center w-full max-w-10 rounded-full overflow-hidden`}
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
            className={`transition-colors hover:duration-100 group-hover:duration-100 duration-300 flex items-center ${
              dark
                ? "text-white group-hover:text-black"
                : "text-black group-hover:text-white"
            }`}
          >
            {title}
            {!url && (
              <Body size={"sm"} className={`text-pretty`}>
                - Coming Soon
              </Body>
            )}
          </Label>
          <Body size={"sm"} className={`text-pretty`}>
            {description}
          </Body>
          {categories.length > 0 && (
            <div className={`flex flex-wrap gap-1 mt-1`}>
              {categories.map((category, index) => {
                return (
                  <CategoryPill key={`category-pill-${index}`} hover>
                    {category}
                  </CategoryPill>
                );
              })}
            </div>
          )}
        </div>
        <div
          className={`w-10 relative grow-0 shrink-0 flex items-start content-center transition-all hover:duration-100 group-hover:duration-100 duration-300 mr-0 ml-auto`}
        >
          {url && (
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
          )}
        </div>
      </Tag>
    </motion.div>
  );
};

export default ProjectCard;
