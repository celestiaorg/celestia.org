// function that checks if href is an internal link
export function isInternalLink(href: string | null | undefined): boolean {
  if (!href) return false;
  return href.startsWith("/") || !href.startsWith("http");
}
