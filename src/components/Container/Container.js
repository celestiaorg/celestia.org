const Container = ({
  children,
  size = "lg",
  padding = true,
  className = "",
  ref,
  id,
}) => {
  const containerClasses = {
    noMax: "w-full mx-auto",
    md: "w-full max-w-[1160px] mx-auto",
    lg: "w-full max-w-[1265px] mx-auto",
    xl: "w-full max-w-[1408px] mx-auto",
    // Freeze width for the redesigned pages — content caps at 1280px
    // (prototype --content-max) + 2×120px gutters. Bigger screens only
    // gain side padding; nothing stretches.
    "2xl": "w-full max-w-[1520px] mx-auto",
  };

  // The redesigned pages use the prototype's canonical gutter scale
  // (--page-gutter: 120 → 60 → 24); legacy sizes keep the old scale.
  const paddingClasses =
    size === "2xl"
      ? "px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]"
      : "px-4 md:px-10 xl:px-20";

  return (
    <div
      id={id}
      className={`${containerClasses[size]} ${padding ? paddingClasses : ""} ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Container;
