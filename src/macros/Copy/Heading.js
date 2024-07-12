const Heading = ({ children, className, tag = "h1", size = "lg" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "",
    md: "text-[1.75rem] leading-[1.2] lg:text-[2em] lg:leading-tight",
    lg: "",
  };

  return <Tag className={`${sizeClasses[size]} ${className}`}>{children}</Tag>;
};

export default Heading;
