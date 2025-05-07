const Container = ({ children, size = "lg", padding = true, className = "", ref, id }) => {
	const containerClasses = {
		noMax: "w-full mx-auto",
		md: "w-full max-w-[1160px] mx-auto",
		lg: "w-full max-w-[1265px] mx-auto",
		xl: "w-full max-w-[1408px] mx-auto",
	};

	return (
		<div id={id} className={`${containerClasses[size]} ${padding ? "px-4 md:px-10" : ""} ${className}`} ref={ref}>
			{children}
		</div>
	);
};

export default Container;
