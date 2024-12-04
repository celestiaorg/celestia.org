const ScaledText = ({
  children,
  mobileFontSize = "lg",
  className,
  tag = "h1",
}) => {
  const Tag = tag;

  return (
    <Tag
      className={`${
        mobileFontSize == "lg"
          ? "text-scaled-mobile-50"
          : "text-scaled-mobile-40"
      } leading-[1.1] lg:text-scaled-desktop-82 ${className}`}
    >
      {children}
    </Tag>
  );
};

export default ScaledText;
