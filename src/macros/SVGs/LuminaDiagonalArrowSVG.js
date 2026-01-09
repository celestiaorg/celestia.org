const LuminaDiagonalArrowSVG = ({ color }) => {
	return (
		<svg className='flex-shrink-0' width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M1 1H11M11 1V11M11 1L1 11' stroke={color || 'white'} strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

export default LuminaDiagonalArrowSVG;
