import useThemeColors from "@/utils/useThemeColors";

const EmailAltSVG = ({ dark = false, className = "" }) => {
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
        d="M9.9067 18.2676L10.1706 14.2805L17.4096 7.75788C17.73 7.46569 17.3436 7.3243 16.9194 7.57879L7.98386 13.2248L4.11931 11.9995C3.28985 11.7638 3.28043 11.1888 4.30783 10.7741L19.3607 4.96787C20.0488 4.65682 20.7086 5.13754 20.4446 6.19322L17.8809 18.2676C17.7018 19.1253 17.1833 19.3327 16.467 18.9368L12.5648 16.0525L10.689 17.8717C10.4722 18.0885 10.2932 18.2676 9.9067 18.2676Z"
        fill={fill}
      />{" "}
    </svg>
  );
};

export default EmailAltSVG;
