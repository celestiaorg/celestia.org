import useThemeColors from "@/utils/useThemeColors";

const SearchSVG = ({ dark = false, className = "" }) => {
  const colors = useThemeColors();
  const fill = dark ? colors.white.DEFAULT : colors.black.DEFAULT;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5052 9.50326H9.97854L9.79188 9.32326C10.4452 8.56326 10.8385 7.57659 10.8385 6.50326C10.8385 4.10992 8.89854 2.16992 6.50521 2.16992C4.11188 2.16992 2.17188 4.10992 2.17188 6.50326C2.17188 8.89659 4.11188 10.8366 6.50521 10.8366C7.57854 10.8366 8.56521 10.4433 9.32521 9.78992L9.50521 9.97659V10.5033L12.8385 13.8299L13.8319 12.8366L10.5052 9.50326ZM6.50521 9.50326C4.84521 9.50326 3.50521 8.16326 3.50521 6.50326C3.50521 4.84326 4.84521 3.50326 6.50521 3.50326C8.16521 3.50326 9.50521 4.84326 9.50521 6.50326C9.50521 8.16326 8.16521 9.50326 6.50521 9.50326Z"
        fill={fill}
        className={`group-hover:fill-[${
          dark ? colors.black.DEFAULT : colors.white.DEFAULT
        }] transition duration-300 ${className}`}
      />
    </svg>
  );
};

export default SearchSVG;
