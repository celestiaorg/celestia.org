// function that checks if href is an internal link
export function isInternalLink(href) {
  return href.startsWith("/") || !href.startsWith("http");
}
