import Icon from "@/macros/Icons/Icon";

const BorderButton = ({ children }) => {
  return (
    <div
      className={`w-full flex justify-between items-center group py-3 px-0 group relative overflow-hidden transition-all duration-200 hover:px-4 `}
    >
      <div
        className={`z-0 absolute w-0 h-[200%] top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 bg-black`}
      ></div>
      <p
        className={`relative z-10 text-xl leading-[1.2] uppercase tracking-wider grow-1 pr-14 group-hover:text-white transition-colors duration-200`}
      >
        {children}
      </p>
      <Icon
        icon={"arrow-short"}
        className={`flex-grow-0`}
        direction="down-right"
      />
    </div>
  );
};

export default BorderButton;
