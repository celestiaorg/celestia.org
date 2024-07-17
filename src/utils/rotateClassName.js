// return rotate class name based on direction
export const rotateClass = (direction) => {
  switch (direction) {
    case "top":
    case "up":
      return "rotate-0";

    case "top-right":
    case "up-right":
    case "right-up":
      return "rotate-45";

    case "right":
      return "rotate-90";

    case "bottom-right":
    case "down-right":
    case "right-down":
      return "rotate-[135deg]";

    case "bottom":
    case "down":
      return "rotate-180";

    case "bottom-left":
    case "down-left":
    case "left-down":
      return "-rotate-[135deg]";

    case "left":
      return "-rotate-90";

    case "top-left":
    case "up-left":
    case "left-up":
      return "-rotate-45";

    default:
      return "rotate-0";
  }
};
