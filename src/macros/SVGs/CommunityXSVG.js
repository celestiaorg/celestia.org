import useThemeColors from "@/utils/useThemeColors";

const CommunityXSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const primaryColor = dark ? colors.white.DEFAULT : colors.black.DEFAULT;
	const secondaryColor = dark ? colors.black.DEFAULT : colors.white.DEFAULT;

	return (
		<svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<rect x='1' y='1' width='40' height='40' rx='20' fill={secondaryColor} stroke={primaryColor} />
			<g clip-path='url(#clip0_255_330)'>
				<path
					d='M22.7142 19.6171L29.4162 11.9967H27.8286L22.0068 18.612L17.3604 11.9967H12L19.0278 22.0012L12 29.9913H13.5876L19.7316 23.0038L24.6396 29.9913H30M14.1606 13.1678H16.5996L27.8274 28.8778H25.3878'
					fill={primaryColor}
				/>
			</g>
			<defs>
				<clipPath id='clip0_255_330'>
					<rect width='18' height='17.9946' fill='white' transform='translate(12 11.9967)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default CommunityXSVG;
