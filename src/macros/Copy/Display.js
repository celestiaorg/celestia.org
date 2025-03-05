const Display = ({ children, style, className, tag = "h1", size = "lg" }) => {
	const Tag = tag;
	const sizeClasses = {
		xs: "text-sm leading-[1.714]",
		sm: "text-[2.3125rem] lg:text-6xl leading-[1.066666666666667]",
		md: "text-[3.125rem] leading-[1.1] tracking-normal lg:text-7xl lg:leading-[1.1111]",
		lg: "text-[4rem] leading-[1] tracking-normal lg:text-[5.125rem] lg:leading-[1]",
		xl: "text-[5.125rem] leading-[1.073171] tracking-normal lg:text-5.5rem] lg:leading-[1.0909091]",
	};

	return (
		<Tag style={style} className={`text-pretty font-youth ${sizeClasses[size]} ${className}`}>
			{children}
		</Tag>
	);
};

export default Display;
