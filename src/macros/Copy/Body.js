const Body = ({ children, className, tag = "p", size = "md" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "text-xs leading-[1.2857]",
    sm: "text-sm leading-[1.2857]",
    md: "text-[1.0625rem] leading-[1.647]",
    lg: "",
  };

  return (
    <Tag className={`text-pretty ${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Body;
