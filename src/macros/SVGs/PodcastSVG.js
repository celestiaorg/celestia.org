import useThemeColors from "@/utils/useThemeColors";

const PodcastSVG = ({ dark = false, className = "" }) => {
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
        fill={fill}
        d="M21.3,20c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3c0,0.5,0.3,0.9,0.7,1.1v10.8h1.2V21.2C21,21,21.3,20.5,21.3,20z"
      />
      <path
        fill={fill}
        d="M14.7,20c0-2.9,2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3c0,1.6-0.7,3-1.9,4l1,1c1.4-1.2,2.3-3,2.3-5c0-3.7-3-6.7-6.7-6.7
	s-6.7,3-6.7,6.7c0,2,0.9,3.8,2.3,5.1l1-1C15.4,23.1,14.7,21.6,14.7,20z"
      />
      <path
        fill={fill}
        d="M9.4,20c0-5.9,4.8-10.6,10.6-10.6c5.9,0,10.6,4.8,10.6,10.6c0,3.1-1.3,5.8-3.4,7.8l1,1c2.3-2.2,3.8-5.3,3.8-8.8
	c0-6.6-5.4-12-12-12S8,13.4,8,20c0,3.5,1.5,6.6,3.9,8.8l1-1C10.7,25.9,9.4,23.1,9.4,20z"
      />
    </svg>
  );
};

export default PodcastSVG;
