import useThemeColors from "@/utils/useThemeColors";

const CommunityTelegramSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const primaryColor = dark ? colors.white.DEFAULT : colors.black.DEFAULT;
	const secondaryColor = dark ? colors.black.DEFAULT : colors.white.DEFAULT;

	return (
		<svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<rect x='1' y='1' width='40' height='40' rx='20' fill={secondaryColor} stroke={primaryColor} />
			<g clip-path='url(#clip0_255_358)'>
				<path
					d='M21.0003 30.1228C26.0497 30.1228 30.1431 26.0306 30.1431 20.9827C30.1431 15.9347 26.0497 11.8425 21.0003 11.8425C15.9508 11.8425 11.8574 15.9347 11.8574 20.9827C11.8574 26.0306 15.9508 30.1228 21.0003 30.1228Z'
					fill={primaryColor}
				/>
				<path
					fill-rule='evenodd'
					clip-rule='evenodd'
					d='M15.9951 20.8861C18.6604 19.7252 20.4377 18.9599 21.327 18.5901C23.8661 17.5344 24.3937 17.351 24.7375 17.3449C24.8132 17.3436 24.9823 17.3623 25.0918 17.4512C25.1843 17.5262 25.2098 17.6276 25.2219 17.6987C25.2341 17.7698 25.2493 17.9319 25.2372 18.0585C25.0996 19.5038 24.5043 23.0111 24.2014 24.6298C24.0732 25.3148 23.8209 25.5444 23.5766 25.5669C23.0456 25.6157 22.6424 25.2161 22.1282 24.8791C21.3235 24.3518 20.8689 24.0235 20.0878 23.509C19.1851 22.9143 19.7703 22.5874 20.2847 22.0533C20.4194 21.9135 22.7587 19.7863 22.804 19.5933C22.8097 19.5692 22.8149 19.4792 22.7615 19.4317C22.708 19.3842 22.6291 19.4005 22.5722 19.4134C22.4915 19.4317 21.2059 20.2811 18.7156 21.9616C18.3508 22.2121 18.0203 22.3342 17.7241 22.3278C17.3977 22.3207 16.7697 22.1432 16.3029 21.9915C15.7303 21.8055 15.2753 21.7071 15.3149 21.3911C15.3355 21.2265 15.5623 21.0582 15.9951 20.8861Z'
					fill={secondaryColor}
				/>
			</g>
			<defs>
				<clipPath id='clip0_255_358'>
					<rect width='18.2857' height='18.2803' fill='white' transform='translate(11.8574 11.8425)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default CommunityTelegramSVG;
