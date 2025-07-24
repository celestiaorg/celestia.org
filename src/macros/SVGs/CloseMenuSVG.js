import useThemeColors from "@/utils/useThemeColors";

const CloseMenuSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const stroke = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

	return (
		<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<path d='M6 6L18 18' stroke={stroke} strokeWidth='1' strokeLinecap='round' />
			<path d='M18 6L6 18' stroke={stroke} strokeWidth='1' strokeLinecap='round' />
		</svg>
	);
};

export default CloseMenuSVG;
