import React from "react";

const HeadingWithSuperscript = ({ children }) => {
  let heading = null;
  let superscript = null;

  // Loop through children to find HeadingWithSuperscript.Heading and HeadingWithSuperscript.Superscript
  React.Children.forEach(children, (child) => {
    switch (child.type) {
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

const Heading = ({ children }) => {
  return <div className={"w-3/4"}>{children}</div>;
};

const Superscript = ({ children }) => {
  return <div className={"w-1/4"}>{children}</div>;
};

// Assign the subcomponents as properties of the main component
HeadingWithSuperscript.Heading = Heading;
HeadingWithSuperscript.Superscript = Superscript;

export default HeadingWithSuperscript;
