import { Label } from "@/macros/Copy";
import StarSVG from "@/macros/SVGs/StarSVG";

const ListItem = ({
  title,
  children,
  type = "star",
  lightMode = false,
  index,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 border-t ${
        lightMode ? "border-black" : "border-white"
      } pt-4 pb-6 lg:pb-7`}
    >
      {title && (
        <Label tag={"h3"} size={"lg"}>
          {title}
        </Label>
      )}
      <div className={`pt-4 pb-2 pl-10 relative block w-full`}>
        {type === "star" && (
          <StarSVG className={"absolute top-5 left-2.5"} dark={!lightMode} />
        )}
        {type === "number" && (
          <Label
            size={"lg"}
            className={"absolute top-4 left-2.5"}
            dark={!lightMode}
          >
            {index}.
          </Label>
        )}
        {children}
      </div>
    </div>
  );
};

export default ListItem;
