import React from "react";
import Container from "@/components/Container/Container";

const ListSection = ({ children }) => {
  let header = null;
  let buttons = null;
  let body = null;

  // Loop through children to find ListSection.Header and ListSection.Body
  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case ListSection.Header:
        header = child;
        break;
      case ListSection.Buttons:
        buttons = child;
        break;
      case ListSection.Body:
        body = child;
        break;
      default:
        break;
    }
  });

  return (
    <section className="bg-black text-white">
      <Container size={"lg"} className={"py-10 lg:py-20"}>
        <div className="block lg:flex lg:gap-6">
          <div className="w-full lg:w-1/2 mb-6">
            {header}
            {buttons}
          </div>
          <div className="w-full lg:w-1/2">{body}</div>
        </div>
      </Container>
    </section>
  );
};

const Header = ({ children }) => {
  return <div className="">{children}</div>;
};

const Buttons = ({ children }) => {
  return <div className="">{children}</div>;
};

const Body = ({ children }) => {
  return <div className="">{children}</div>;
};

// Assign the subcomponents as properties of the main component
ListSection.Header = Header;
ListSection.Buttons = Buttons;
ListSection.Body = Body;

export default ListSection;
