const LuminaStartSVG = ({ className, color }) => {
	return (
		<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<path d='M1 1L11 7L1 13V1Z' stroke={color || '#0F8702'} strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

export default LuminaStartSVG;
