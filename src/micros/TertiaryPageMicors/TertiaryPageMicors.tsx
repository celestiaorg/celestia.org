"use client";
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { Heading as MacroHeading, Body as MacroBody } from "@/macros/Copy";
import ListItemComponent from "@/components/List/ListItem";
import NextImage from "next/image";
import NextLink from "next/link";

// Elements, Micros, and Macros wideley used in the TertiaryPage w/ preset styles, margins, and paddings

interface HeadingProps {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tag?: React.ElementType;
  [key: string]: unknown;
}

const Heading = ({ children, className = "mb-6", ...props }: HeadingProps) => {
  return (
    <MacroHeading size={"md"} {...props} className={className}>
      {children}
    </MacroHeading>
  );
};

interface BodyMicorProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Body = ({ children, className = "mb-6", ...props }: BodyMicorProps) => {
  return (
    <MacroBody size={"md"} {...props} className={className}>
      {children}
    </MacroBody>
  );
};

type ImageProps = Omit<ComponentPropsWithoutRef<typeof NextImage>, "width" | "height"> & {
  className?: string;
};

const Image = ({ className = "mb-6 w-full h-auto", ...props }: ImageProps) => {
  return (
    <NextImage {...props} className={className} width={1440} height={800} />
  );
};

interface ListItemMicorProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

const ListItem = ({ children, className = "mb-6", ...props }: ListItemMicorProps) => {
  return (
    <ListItemComponent {...props} className={className} lightMode>
      {children}
    </ListItemComponent>
  );
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Section = ({ children, className = "mb-12", ...props }: SectionProps) => {
  return (
    <section {...props} className={className}>
      {children}
    </section>
  );
};

interface LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  [key: string]: unknown;
}

const Link = ({ children, className = "underline", ...props }: LinkProps) => {
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
