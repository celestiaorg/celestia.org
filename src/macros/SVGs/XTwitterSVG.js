import useThemeColors from "@/utils/useThemeColors";

const XTwitterSVG = ({ dark = false, className = "" }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.10965 4.54473C4.28062 4.21038 4.62448 4 5 4H13.3333C13.6544 4 13.956 4.15418 14.144 4.41446L22.5431 16.0426L34.2929 4.29289C34.6834 3.90237 35.3166 3.90237 35.7071 4.29289C36.0976 4.68342 36.0976 5.31658 35.7071 5.70711L23.7293 17.6849L35.8107 34.4145C36.0306 34.719 36.0613 35.1209 35.8904 35.4553C35.7194 35.7896 35.3755 36 35 36H26.6667C26.3456 36 26.044 35.8458 25.856 35.5855L17.4569 23.9574L5.70711 35.7071C5.31659 36.0976 4.68342 36.0976 4.2929 35.7071C3.90237 35.3166 3.90237 34.6834 4.2929 34.2929L16.2707 22.3151L4.1893 5.58546C3.96945 5.28102 3.93869 4.87908 4.10965 4.54473ZM18.3907 21.8345L27.1779 34H33.0443L21.6094 18.1655L21.6093 18.1655L12.8221 6H6.95566L18.3906 21.8345L18.3907 21.8345Z"
        fill={fill}
      />
    </svg>
  );
};

export default XTwitterSVG;
