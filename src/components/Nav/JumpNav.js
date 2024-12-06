const JumpNav = () => {
  return (
    <a
      href={`#main-content`}
      className={`sr-only focus:not-sr-only focus:block focus:p-4 focus:z-50 focus:ring text-center text-base w-full`}
    >
      Skip to main content
    </a>
  );
};

export default JumpNav;
