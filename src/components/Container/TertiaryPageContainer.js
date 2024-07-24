import React from "react";
import Container from "@/components/Container/Container";

const TertiaryPageContainer = ({ children }) => {
  let body = null;
  let sidebar = null;

  // Loop through children to find ListSection.Header and ListSection.Body
  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case TertiaryPageContainer.Body:
        body = child;
        break;
      case TertiaryPageContainer.Sidebar:
        sidebar = child;
        break;
      default:
        break;
    }
  });

  return (
    <Container size={"lg"}>
      <div className="block lg:flex flex-row-reverse lg:gap-20 items-stretch">
        {sidebar ? sidebar : <div className="w-full lg:w-1/4"></div>}
        {body}
      </div>
    </Container>
  );
};

const Body = ({ children }) => {
  return <div className="w-full lg:w-3/4 py-10 lg:py-20">{children}</div>;
};

const Sidebar = ({ children }) => {
  return (
    <div className="w-full lg:w-1/4">
      <div className="pt-10 lg:py-20 lg:sticky lg:top-[120px] z-20">
        {children}
      </div>
    </div>
  );
};

// Assign the subcomponents as properties of the main component
TertiaryPageContainer.Body = Body;
TertiaryPageContainer.Sidebar = Sidebar;

export default TertiaryPageContainer;
