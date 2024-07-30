import React from "react";
import { Heading, Body as BodyMacro } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const Accordion = ({ children, id, toggleAccordion, isOpen }) => {
  let header = null;
  let body = null;

  // Loop through children to find HeadingWithSuperscript.Heading and HeadingWithSuperscript.Superscript
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
      className={`border-b border-black px-4 ${
        isOpen ? " pt-6 pb-4" : " py-6"
      }`}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
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

      <div
        id={`accordion-${id}`}
        role="region"
        aria-labelledby="accordion-header"
        style={{
          height: isOpen ? `auto` : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
        className={``}
      >
        {body}
      </div>
    </div>
  );
};

const Header = ({ children }) => {
  return (
    <Heading tag={"h3"} size={"sm"}>
      {children}
    </Heading>
  );
};

const Body = ({ children, className = "pt-4 pr-16" }) => {
  return (
    <BodyMacro size={"md"} className={className}>
      {children}
    </BodyMacro>
  );
};

// Assign the subcomponents as properties of the main component
Accordion.Header = Header;
Accordion.Body = Body;

export default Accordion;
