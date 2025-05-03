import useThemeColors from "@/utils/useThemeColors";

const HamburgerMenuSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const stroke = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<path d='M5 7H19' stroke={stroke} strokeWidth='1' strokeLinecap='round' />
			<path d='M5 12H19' stroke={stroke} strokeWidth='1' strokeLinecap='round' />
			<path d='M5 17H19' stroke={stroke} strokeWidth='1' strokeLinecap='round' />
		</svg>
	);
};

export default HamburgerMenuSVG;
