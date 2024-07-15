const Heading = ({ children, className, tag = "h1", size = "lg" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "",
    md: "text-[1.75rem] leading-[1.2] lg:text-[2rem] lg:leading-tight",
    lg: "text-4xl leading-[1.2] lg:text-[2.5rem] lg:leading-tight",
  };

  return <Tag className={`${sizeClasses[size]} ${className}`}>{children}</Tag>;
};

export default Heading;
