const Row = ({ children, reverse = false, className = "", align = false }) => {
  // Current design system defaults mobile columns to be 100% width, hence leaving columns as block element on mobile to stack vertically
  // Current design system also prioritizes flex direction column, hence this component does not have a prop to change flex direction
  // Additional styles can be added or overriden by passing a className prop

  return (
    <div
      className={`
        w-full block lg:flex 
        ${reverse ? "lg:flex-col-reverse" : ""} 
        ${align ? "lg:items-center" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Row;
