import useThemeColors from "@/utils/useThemeColors";

const FacebookSVG = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.1393 12.0369C22.1393 17.2197 18.2497 21.494 13.2297 22.1017C13.2296 22.1017 13.2297 22.1017 13.2297 22.1017L13.2298 15.1345H15.971L16.5387 12.0367H13.2253V10.9413C13.2253 9.30285 13.8662 8.67429 15.5288 8.67429C16.0436 8.67429 16.4615 8.68668 16.7009 8.7109V5.90436C16.2464 5.77876 15.1397 5.65316 14.4987 5.65316C11.1126 5.65316 9.55136 7.25102 9.55136 10.7019V12.0367H7.45899V15.135H9.55136V21.8768C5.13566 20.7809 1.86328 16.7913 1.86328 12.0369C1.86328 6.43794 6.4023 1.89893 12.0013 1.89893C17.6003 1.89893 22.1393 6.43794 22.1393 12.0369Z"
        fill={fill}
      />
      <path
        d="M9.5524 21.877C9.55224 21.877 9.55257 21.8771 9.5524 21.877V21.877Z"
        fill={fill}
      />
    </svg>
  );
};

export default FacebookSVG;
