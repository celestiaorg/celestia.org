// function that checks if href is an internal link
export function isInternalLink(href) {
  // Check if href is a relative path or anchor
  if (href.startsWith("/") || href.startsWith("#")) return true;

  // Get the current site's URL
  const currentSiteUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  // Check if the link is an absolute path to the site's current URL
  if (href.startsWith(currentSiteUrl)) {
    return true;
  }

  // Otherwise return false
  return false;
}
