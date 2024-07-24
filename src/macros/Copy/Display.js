const Display = ({ children, className, tag = "h1", size = "lg" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "text-[2.3125rem] leading-[1.2] lg:text-6xl leading-[1.066666666666667]",
    md: "text-[3.125rem] leading-[1.1] tracking-tighter lg:text-7xl lg:leading-[1.1111]",
    lg: "text-[4rem] leading-[1.046875] tracking-tighter lg:text-[5.125rem] lg:leading-[1.073171]",
  };

  return (
    <Tag className={`text-pretty ${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Display;
