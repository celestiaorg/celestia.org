const Label = ({ children, className, tag = "p", size = "md" }) => {
  const Tag = tag;
  const sizeClasses = {
    xs: "",
    sm: "",
    md: "",
    lg: "text-xl leading-[1.2]",
  };

  return (
    <Tag className={`uppercase ${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Label;
