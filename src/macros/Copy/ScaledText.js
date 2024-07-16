const ScaledText = ({ children, className, tag = "h1" }) => {
  const Tag = tag;

  return (
    <Tag
      className={`text-scaled-mobile-50 leading-[1.1] lg:text-scaled-desktop-82 ${className}`}
    >
      {children}
    </Tag>
  );
};

export default ScaledText;
