"use client";
import { default as NextLink } from "next/link";
import { isInternalLink } from "@/utils/isInternalLink";

const Link = ({ children, href, self = true, ...props }) => {
  const isInternal = isInternalLink(href);
  return (
    <NextLink
      href={href}
      target={self || isInternal ? "_self" : "_blank"}
      prefetch={isInternal}
      scroll={true}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
