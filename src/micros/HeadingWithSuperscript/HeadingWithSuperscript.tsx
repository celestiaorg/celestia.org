import React from "react";

const HeadingWithSuperscript = ({ children }: { children: React.ReactNode }) => {
  let heading: React.ReactNode = null;
  let superscript: React.ReactNode = null;

  // Loop through children to find HeadingWithSuperscript.Heading and HeadingWithSuperscript.Superscript
  React.Children.forEach(children, (child) => {
    const type = (child as { type?: unknown })?.type;
    switch (type) {
      case HeadingWithSuperscript.Heading:
        heading = child;
        break;
      case HeadingWithSuperscript.Superscript:
        superscript = child;
        break;
      default:
        break;
    }
  });

  return (
    <div className="flex">
      {heading}
      {superscript}
    </div>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <div className={"w-3/4"}>{children}</div>;
};

const Superscript = ({ children }: { children: React.ReactNode }) => {
  return <div className={"w-1/4"}>{children}</div>;
};

// Assign the subcomponents as properties of the main component
HeadingWithSuperscript.Heading = Heading;
HeadingWithSuperscript.Superscript = Superscript;

export default HeadingWithSuperscript;
