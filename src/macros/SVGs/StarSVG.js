import useThemeColors from "@/utils/useThemeColors";

const StarSVG = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.67055 0H9.37609V6.49697L15.1603 4.46061L16 7.12727L10.1224 9.16364L13.7143 14.303L11.5685 16L8.02332 10.7636L4.47813 16L2.28571 14.303L5.87755 9.16364L0 7.12727L0.83965 4.46061L6.67055 6.49697V0Z"
        fill={fill}
      />
    </svg>
  );
};

export default StarSVG;
