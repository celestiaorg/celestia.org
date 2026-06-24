"use client";
import { Heading as MacroHeading, Body as MacroBody } from "@/macros/Copy";
import ListItemComponent from "@/components/List/ListItem";
import NextImage from "next/image";
import NextLink from "next/link";

// Elements, Micros, and Macros wideley used in the TertiaryPage w/ preset styles, margins, and paddings

const Heading = ({ children, className = "mb-6", ...props }) => {
  return (
    <MacroHeading size={"md"} {...props} className={className}>
      {children}
    </MacroHeading>
  );
};

const Body = ({ children, className = "mb-6", ...props }) => {
  return (
    <MacroBody size={"md"} {...props} className={className}>
      {children}
    </MacroBody>
  );
};

const Image = ({ children, className = "mb-6 w-full h-auto", ...props }) => {
  return (
    <NextImage {...props} className={className} width={1440} height={800}>
      {children}
    </NextImage>
  );
};

const ListItem = ({ children, className = "mb-6", ...props }) => {
  return (
    <ListItemComponent {...props} className={className} lightMode>
      {children}
    </ListItemComponent>
  );
};

const Section = ({ children, className = "mb-12", ...props }) => {
  return (
    <section {...props} className={className}>
      {children}
    </section>
  );
};

const Link = ({ children, className = "underline", ...props }) => {
  return (
    <NextLink
      {...props}
      className={`text-link text-link-underline-anim ${className}`}
    >
      <span className="text">{children}</span>
      <svg className="svg" viewBox="0 0 13 20">
        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
      </svg>
    </NextLink>
  );
};

export { Heading, Body, Image, ListItem, Section, Link };
