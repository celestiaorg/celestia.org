import useThemeColors from "@/utils/useThemeColors";

const BlogSVG = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;
  const stroke = dark ? colors.black.DEFAULT : colors.white.DEFAULT;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M32.1,14L26,7.9V7.9H10.1c-1.3,0-2.3,1-2.3,2.3v19.7c0,1.3,1,2.3,2.3,2.3h19.7c1.3,0,2.3-1,2.3-2.3L32.1,14L32.1,14z M30,14
	h-4V10L30,14z M30.6,29.9c0,0.4-0.4,0.8-0.8,0.8H10.1c-0.4,0-0.8-0.4-0.8-0.8V10.2c0-0.4,0.4-0.8,0.8-0.8h14.4v6.1h6.1V29.9z"
      />
      <rect fill={fill} x="13.1" y="13.9" width="6.9" height="1.5" />
      <rect fill={fill} x="13.1" y="19.4" width="13.7" height="1.5" />
      <rect fill={fill} x="13.1" y="24.9" width="13.7" height="1.5" />
    </svg>
  );
};

export default BlogSVG;
