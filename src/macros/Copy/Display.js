const Display = ({ children, className, tag = "h1", size = "lg" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "",
    md: "text-[3.125rem] leading-[1.1] tracking-tighter lg:text-7xl lg:leading-[1.1111]",
    lg: "text-[4rem] leading-[1.046875] tracking-tighter lg:text-[5.125rem] lg:leading-[1.073171]",
  };

  return <Tag className={`${sizeClasses[size]} ${className}`}>{children}</Tag>;
};

export default Display;
