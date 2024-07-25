export const getButtonType = (href, onClick) => {
  if (href) return "anchor";
  if (onClick) return "button";
  return "div";
};
