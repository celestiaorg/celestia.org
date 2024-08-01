import { motion } from "framer-motion";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const ScrollControls = ({ activeSection, sectionDetails }) => {
  return (
    <motion.div
      className="fixed top-1/2 -translate-y-1/2 right-10 flex flex-col gap-1.5 z-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <a
        className={`group ${
          Object.entries(sectionDetails)[activeSection - 1]
            ? null
            : "opacity-50 pointer-events-none"
        }`}
        href={
          Object.entries(sectionDetails)[activeSection - 1]
            ? Object.entries(sectionDetails)[activeSection - 1][1]
            : null
        }
        disabled={activeSection === 0}
      >
        <Icon
          Icon={<ArrowLongSVG />}
          hover
          HoverIcon={<ArrowLongSVG />}
          className={`flex-grow-0`}
          direction="up"
          border
          size={"md"}
        />
      </a>
      <a
        className={`group ${
          Object.entries(sectionDetails)[activeSection + 1]
            ? null
            : "opacity-50 pointer-events-none"
        }`}
        href={
          Object.entries(sectionDetails)[activeSection + 1]
            ? Object.entries(sectionDetails)[activeSection + 1][1]
            : null
        }
        disabled={activeSection === 0}
      >
        <Icon
          Icon={<ArrowLongSVG />}
          hover
          HoverIcon={<ArrowLongSVG />}
          className={`flex-grow-0`}
          direction="down"
          border
          size={"md"}
        />
      </a>
    </motion.div>
  );
};

export default ScrollControls;
