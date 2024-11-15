import React from "react";
import { motion } from "framer-motion";
import { Heading, Body as BodyMacro } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const Accordion = ({ children, id, toggleAccordion, isOpen }) => {
  let header = null;
  let body = null;

  // Loop through children to find Header and Body
  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case Accordion.Header:
        header = child;
        break;
      case Accordion.Body:
        body = child;
        break;
      default:
        break;
    }
  });

  return (
    <div
      className={`border-b border-black px-4 ${isOpen ? "pt-6 pb-4" : "py-6"}`}
      id={`accordion-${id}`}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}-body`}
        onClick={toggleAccordion}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleAccordion();
          }
        }}
        className={"flex gap-3 items-center w-full py-5 group"}
      >
        {header}
        <Icon
          Icon={<ArrowLongSVG />}
          hover
          HoverIcon={<ArrowLongSVG />}
          className={`flex-grow-0 shrink-0 mr-0 ml-auto`}
          direction={isOpen ? "up" : "down"}
          size={"md"}
          border={false}
        />
      </button>

      {/* Accordion body with Framer Motion for smooth expansion/collapse */}
      <motion.div
        id={`accordion-${id}-body`}
        role="region"
        aria-labelledby="accordion-header"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
        style={{ overflow: "hidden" }}
        className=""
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {body}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = ({ children }) => {
  return <>{children}</>;
};

const Body = ({ children, className = "pt-4 pr-16" }) => {
  return (
    <div size={"md"} className={className}>
      {children}
    </div>
  );
};

// Assign the subcomponents as properties of the main component
Accordion.Header = Header;
Accordion.Body = Body;

export default Accordion;
