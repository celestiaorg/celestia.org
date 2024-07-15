const Container = ({ children, size = "lg", className = "" }) => {
  const containerClasses = {
    noMax: "w-full px-4 md:px-10 mx-auto",
    lg: "w-full max-w-[1265px] px-4 md:px-10 mx-auto",
    xl: "w-full max-w-[1408px] px-4 md:px-10 mx-auto",
  };

  return (
    <div className={`${containerClasses[size]} ${className}`}>{children}</div>
  );
};

export default Container;
