const ArrowRightSVG = ({ className = "", color = "currentColor" }) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M9.1287 5.08366L5.1057 1.06066L6.16635 0L12 5.83366L6.16635 11.6672L5.1057 10.6066L9.1287 6.58366H0V5.08366H9.1287Z"
				fill={color}
			/>
		</svg>
	);
};

export default ArrowRightSVG;
