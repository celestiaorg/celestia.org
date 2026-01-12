"use client";
import { default as NextLink } from "next/link";
import { isInternalLink } from "@/utils/isInternalLink";

const Link = ({ children, href, self = null, ...props }) => {
  const isInternal = isInternalLink(href);
  const isAnchorOnly = href?.startsWith("#");

  // Handle smooth scroll for hash-only links
  const handleAnchorClick = (e) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jumping
      window.history.pushState(null, "", href);
    }
  };

  // Use regular anchor with smooth scroll for hash-only links
  if (isAnchorOnly) {
    return (
      <a href={href} onClick={handleAnchorClick} {...props}>
        {children}
      </a>
    );
  }

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
