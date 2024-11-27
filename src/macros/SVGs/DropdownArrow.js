import useThemeColors from "@/utils/useThemeColors";

const DropdownArrow = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9776 5.99969L8.56427 8.58635L11.1509 5.99969C11.4109 5.73969 11.8309 5.73969 12.0909 5.99969C12.3509 6.25969 12.3509 6.67969 12.0909 6.93969L9.03094 9.99969C8.77094 10.2597 8.35094 10.2597 8.09094 9.99969L5.03094 6.93969C4.77094 6.67969 4.77094 6.25969 5.03094 5.99969C5.29094 5.74635 5.7176 5.73969 5.9776 5.99969Z"
        fill={fill}
        className={`group-hover:fill-[${
          dark ? colors.black.DEFAULT : colors.white.DEFAULT
        }] transition duration-300 ${className}`}
      />
    </svg>
  );
};

export default DropdownArrow;
