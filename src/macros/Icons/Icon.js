import { rotateClass } from "@/utils/rotateClassName";

const Icon = ({
  icon = "arrow-long",
  direction = "up",
  hoverIcon = "arrow-long",
  hoverDirection = "up",
  className,
}) => {
  return (
    <div
      className={`group transition-colors duration-200 h-6 w-6 ${className} rounded-full relative overflow-hidden invert`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-full transition-transform ${rotateClass(
          direction
        )}`}
      >
        <div className="absolute top-0 left-0 h-full w-full group-hover:-top-full transition-all duration-300 group-hover:invert">
          <div
            className={`top-0 left-0 absolute h-full w-full flex justify-center items-center`}
          >
            <img src={`/images/${icon}.svg`} className={`h-6 w-6`} />
          </div>
          <div
            className={`top-full left-0 absolute h-full w-full  flex justify-center items-center transition-transform ${rotateClass(
              hoverDirection
            )}`}
          >
            <img src={`/images/${hoverIcon}.svg`} className={`h-6 w-6`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Icon;
