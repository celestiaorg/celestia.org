"use client";
import NextLink from "next/link";

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

// function that checks if href is an internal link
function isInternalLink(href) {
  // Check if href is a relative path or anchor
  if (href.startsWith("/") || href.startsWith("#")) return true;

  // Get the current site's URL
  const currentSiteUrl = window.location.origin;

  // Check if the link is an absolute path to the site's current URL
  if (href.startsWith(currentSiteUrl)) {
    return true;
  }

  // Otherwise return false
  return false;
}

export default Link;
