const Heading = ({
  children,
  className,
  tag = "h1",
  size = "lg",
  ...props
}) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "text-xl leading-[1.4] lg:text-2xl lg:leading-[1.333333333333333]",
    md: "text-[1.75rem] leading-[1.2] lg:text-[2rem] lg:leading-tight",
    lg: "text-4xl leading-[1.2] lg:text-[2.5rem] lg:leading-tight",
  };

  return (
    <Tag {...props} className={`${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
