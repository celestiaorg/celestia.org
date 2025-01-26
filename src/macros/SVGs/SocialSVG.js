import useThemeColors from "@/utils/useThemeColors";

const SocialSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

	return (
		<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<svg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M13.8714 22.173L26.1249 29.0655M26.1249 11.9345L13.8714 18.827M14.3101 20.5C14.3101 22.3849 12.7821 23.9128 10.8972 23.9128C9.01236 23.9128 7.48438 22.3849 7.48438 20.5C7.48438 18.6151 9.01236 17.0872 10.8972 17.0872C12.7821 17.0872 14.3101 18.6151 14.3101 20.5ZM32.5119 10.2615C32.5119 12.1463 30.9839 13.6743 29.099 13.6743C27.2142 13.6743 25.6862 12.1463 25.6862 10.2615C25.6862 8.37661 27.2142 6.84863 29.099 6.84863C30.9839 6.84863 32.5119 8.37661 32.5119 10.2615ZM32.5119 30.7385C32.5119 32.6234 30.9839 34.1514 29.099 34.1514C27.2142 34.1514 25.6862 32.6234 25.6862 30.7385C25.6862 28.8537 27.2142 27.3257 29.099 27.3257C30.9839 27.3257 32.5119 28.8537 32.5119 30.7385Z'
					stroke={fill}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>

			{/* fill={fill} */}
		</svg>
	);
};

export default SocialSVG;
