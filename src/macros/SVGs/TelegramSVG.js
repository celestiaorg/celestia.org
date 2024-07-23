import useThemeColors from "@/utils/useThemeColors";

const TelegramSVG = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.5092 30.4458L16.9491 23.8006L29.014 12.9296C29.5481 12.4426 28.904 12.207 28.1971 12.6312L13.3045 22.0412L6.86357 19.9989C5.48113 19.6062 5.46542 18.6479 7.17776 17.9567L32.2659 8.27963C33.4127 7.76121 34.5123 8.5624 34.0725 10.3219L29.7995 30.4458C29.501 31.8753 28.637 32.2209 27.443 31.5611L20.9393 26.754L17.8131 29.786C17.4518 30.1473 17.1533 30.4458 16.5092 30.4458Z"
        fill={fill}
      />
    </svg>
  );
};

export default TelegramSVG;
