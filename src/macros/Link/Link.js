"use client";
import NextLink from "next/link";
import { isInternalLink } from "@/utils/isInternalLink";

const Link = ({ children, href, self = null, ...props }) => {
  const isInternal = isInternalLink(href);
  return (
    <NextLink
      href={href}
      target={self || isInternal ? "_self" : "_blank"}
      prefetch={isInternal}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
