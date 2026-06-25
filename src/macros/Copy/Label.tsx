type LabelSize = "xs" | "sm" | "md" | "lg";

interface LabelProps {
	children: React.ReactNode;
	className?: string;
	tag?: React.ElementType;
	size?: LabelSize;
}

const Label = ({ children, className, tag = "p", size = "md" }: LabelProps) => {
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
