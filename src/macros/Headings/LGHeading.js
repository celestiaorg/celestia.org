const LGHeading = ({ children, tag = "h1", className = "" }) => {
  const Tag = tag;
  const mobileStyles = `text-[4rem] leading-[1.046875] tracking-tighter`;
  const desktopStyles = `lg:text-[5.125rem] lg:leading-[1.073171]`;

  return (
    <Tag className={`${mobileStyles} ${desktopStyles} ${className}`}>
      {children}
    </Tag>
  );
};

export default LGHeading;
