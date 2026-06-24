export const getButtonType = (
  href: string | null | undefined,
  onClick: ((...args: unknown[]) => unknown) | null | undefined
): "anchor" | "button" | "div" => {
  if (href) return "anchor";
  if (onClick) return "button";
  return "div";
};
