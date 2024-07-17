const PrimaryButton = ({
  children,
  className,
  onClick,
  lightMode = false,
  noBorder = false,
  size = "md",
}) => {
  const baseClasses = `leading-none text-center uppercase rounded-full block no-underline  active:scale-[1.2] transform transition-all duration-150`;
  const lightModeClasses = `text-black border-black hover:text-white transition-all duration-300`;
  const darkModeClasses = `bg-black text-white border-white hover:text-black hover:border-black transition-all duration-300`;
  const borderClasses = noBorder ? `border-0` : `border`;
  const sizeClasses = {
    sm: `text-xs px-3 py-2`,
    md: `text-xs px-5 py-3`,
    lg: `text-base px-10 py-5`,
  };

  return (
    <div
      className={`group relative block overflow-hidden 
        ${baseClasses} 
        ${sizeClasses[size]}
        ${lightMode ? lightModeClasses : darkModeClasses}
        ${borderClasses} 
        ${className}
        `}
      onClick={onClick}
    >
      <div
        className={`z-0 absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${
          lightMode ? "bg-black" : "bg-white"
        }`}
      ></div>
      <span className={`relative z-10`}>{children}</span>
    </div>
  );
};

export default PrimaryButton;
