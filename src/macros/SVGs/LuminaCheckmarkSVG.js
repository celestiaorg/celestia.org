const LuminaCheckmarkSVG = ({ color, backgroundColor }) => {
	// If color is provided, use it for the checkmark stroke, otherwise use white
	// backgroundColor can be provided to override the default green
	return (
		<svg className='flex-shrink-0' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width='24' height='24' rx='12' fill={backgroundColor || '#0F8702'} />
			<path d='M16 9.25L10.5 14.75L8 12.25' stroke={color || 'white'} strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

export default LuminaCheckmarkSVG;
