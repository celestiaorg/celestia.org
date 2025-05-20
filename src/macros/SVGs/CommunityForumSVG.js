import useThemeColors from "@/utils/useThemeColors";

const CommunityForumSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const primaryColor = dark ? colors.white.DEFAULT : colors.black.DEFAULT;
	const secondaryColor = dark ? colors.black.DEFAULT : colors.white.DEFAULT;

	return (
		<svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<rect x='1' y='1' width='40' height='40' rx='20' fill={secondaryColor} stroke={primaryColor} />
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M20.9975 13.7107C16.9749 13.7107 13.7129 16.9716 13.7129 20.9942C13.7129 25.0168 16.9738 28.2778 20.9964 28.2778H24.6425C25.2388 28.2778 25.5369 28.2778 25.786 28.2355C27.0436 28.0222 28.0288 27.037 28.2421 25.7795C28.2843 25.5304 28.2843 25.2323 28.2843 24.636V20.9964C28.2843 16.9726 25.0213 13.7107 20.9975 13.7107ZM17.57 20.185C17.57 19.6327 18.0177 19.185 18.57 19.185H23.4272C23.9795 19.185 24.4272 19.6327 24.4272 20.185C24.4272 20.7372 23.9795 21.185 23.4272 21.185H18.57C18.0177 21.185 17.57 20.7372 17.57 20.185ZM19.9986 23.4221C19.9986 22.8698 20.4463 22.4221 20.9986 22.4221H23.4272C23.9795 22.4221 24.4272 22.8698 24.4272 23.4221C24.4272 23.9744 23.9795 24.4221 23.4272 24.4221H20.9986C20.4463 24.4221 19.9986 23.9744 19.9986 23.4221Z'
				fill={primaryColor}
			/>
		</svg>
	);
};

export default CommunityForumSVG;
