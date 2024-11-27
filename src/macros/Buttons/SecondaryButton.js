import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";

const SecondaryButton = ({
  children,
  className,
  onClick = null,
  href = null,
  self = null,
  lightMode = false,
  noBorder = false,
  hover = true,
  size = "md",
}) => {
  const baseClasses = `leading-none text-center uppercase rounded-full block no-underline transform transition-all duration-150`;
  const lightModeClasses = `text-purple-dark border-purple-dark ${
    hover ? "hover:text-white transition-all duration-300" : null
  }`;
  const darkModeClasses = `bg-purple text-white border-white ${
    hover
      ? "hover:text-purple-dark hover:border-purple-dark transition-all duration-300"
      : null
  }`;
  const borderClasses = noBorder ? `border-0` : `border`;
  const sizeClasses = {
    sm: `text-xs px-3 py-2`,
    md: `text-xs px-5 py-3`,
    lg: `text-base px-10 py-5`,
  };

  // define what element the button should render as
  const buttonType = getButtonType(href, onClick);
  const ButtonTypes = {
    anchor: Link,
    button: "button",
    div: "div",
  };
  const Button = ButtonTypes[buttonType];

  return (
    <Button
      className={`group relative block overflow-hidden 
        ${baseClasses} 
        ${sizeClasses[size]}
        ${lightMode ? lightModeClasses : darkModeClasses}
        ${borderClasses} 
        ${className}
        `}
      onClick={onClick}
      href={href}
      self={self}
    >
      {hover && (
        <div
          className={`z-0 absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${
            lightMode ? "bg-purple" : "bg-white"
          }`}
        ></div>
      )}
      <div className={`relative z-10`}>{children}</div>
    </Button>
  );
};

export default SecondaryButton;
