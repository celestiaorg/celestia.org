"use client";
import { Heading as MacroHeading, Body as MacroBody } from "@/macros/Copy";
import ListItemComponent from "@/components/List/ListItem";
import NextImage from "next/image";

// Elements, Micros, and Macros wideley used in the TertiaryPage w/ preset styles, margins, and paddings

const Heading = ({ children, ...props }) => {
  return (
    <MacroHeading size={"md"} {...props} className={"mb-6"}>
      {children}
    </MacroHeading>
  );
};

const Body = ({ children, ...props }) => {
  return (
    <MacroBody size={"md"} {...props} className={"mb-6"}>
      {children}
    </MacroBody>
  );
};

const Image = ({ children, ...props }) => {
  return (
    <NextImage
      {...props}
      className={"mb-6 w-full h-auto"}
      width={1440}
      height={800}
    >
      {children}
    </NextImage>
  );
};

const ListItem = ({ children, ...props }) => {
  return (
    <ListItemComponent {...props} className={"mb-6"}>
      {children}
    </ListItemComponent>
  );
};

const Section = ({ children, ...props }) => {
  return (
    <section {...props} className={"mb-12"}>
      {children}
    </section>
  );
};

export { Heading, Body, Image, ListItem, Section };
