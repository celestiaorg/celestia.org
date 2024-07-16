const PrimaryButton = ({
  children,
  className,
  onClick,
  lightMode = false,
  noBorder = false,
}) => {
  const baseClasses = `text-xs leading-none text-center uppercase rounded-full block no-underline px-5 py-3`;
  const lightModeClasses = `text-black border-black hover:text-white transition-all duration-300`;
  const darkModeClasses = `bg-black text-white border-white hover:text-black hover:border-black transition-all duration-300`;
  const borderClasses = noBorder ? `border-0` : `border`;

  return (
    <button
      className={`group relative block overflow-hidden ${baseClasses} ${
        lightMode ? lightModeClasses : darkModeClasses
      } ${borderClasses} ${className}`}
      onClick={onClick}
    >
      <div
        className={`z-0 absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${
          lightMode ? "bg-black" : "bg-white"
        }`}
      ></div>
      <span className={`relative z-10`}>{children}</span>
    </button>
  );
};

export default PrimaryButton;
