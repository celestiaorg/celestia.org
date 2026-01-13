const CalendarSVG = ({ className = "" }) => {
	return (
		<svg className={className} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M5.33333 1V3.8M10.6667 1V3.8M2 6.6H14M3.33333 2.4H12.6667C13.403 2.4 14 3.0268 14 3.8V13.6C14 14.3732 13.403 15 12.6667 15H3.33333C2.59695 15 2 14.3732 2 13.6V3.8C2 3.0268 2.59695 2.4 3.33333 2.4Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CalendarSVG;
