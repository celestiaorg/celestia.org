const Col = ({ children, width, className = "" }) => {
  // Current design system defaults mobile to be 100% width, hence the width prop only applies to large screens
  // Additional styles can be added or overriden by passing a className prop

  // Define the width classes
  const widthMap = {
    10: "lg:w-1/10",
    20: "lg:w-2/10",
    25: "lg:w-1/4",
    30: "lg:w-3/10",
    33: "lg:w-1/3",
    40: "lg:w-4/10",
    50: "lg:w-1/2",
    60: "lg:w-6/10",
    66: "lg:w-2/3",
    70: "lg:w-7/10",
    75: "lg:w-3/4",
    80: "lg:w-8/10",
    90: "lg:w-9/10",
    100: "lg:w-full",
  };

  const widthClass = widthMap[width] || "lg:w-full";
  return <div className={`w-full ${widthClass} ${className}`}>{children}</div>;
};

export default Col;
