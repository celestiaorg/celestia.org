const Body = ({ children, className, tag = "p", size = "md" }) => {
	const Tag = tag;
	const sizeClasses = {
		xs: "text-xs leading-[1.2857]",
		sm: "text-sm leading-[1.2857]",
		md: "text-[1.0625rem] leading-[1.647]",
		lg: "text-[1.0625rem] leading-[2rem] lg:text-2xl lg:leading-[2rem]",
	};

	return <Tag className={`text-pretty font-untitledSans ${sizeClasses[size]} ${className}`}>{children}</Tag>;
};

export default Body;
