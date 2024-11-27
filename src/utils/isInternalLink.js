// function that checks if href is an internal link
export function isInternalLink(href) {
  if (!href) return false;
  return href.startsWith("/") || !href.startsWith("http");
}
