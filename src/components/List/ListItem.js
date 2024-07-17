import { Label } from "@/macros/Copy";
import StarSVG from "@/macros/SVGs/StarSVG";

const ListItem = ({ title, children, type }) => {
  return (
    <div
      className={`flex flex-col gap-4 border-t border-white pt-4 pb-8 lg:pb-10`}
    >
      {title && (
        <Label tag={"h3"} size={"lg"}>
          {title}
        </Label>
      )}
      <div className={`pt-4 pb-2 pl-10 relative block w-full`}>
        {type === "star" && (
          <StarSVG className={"absolute top-5 left-2.5"} dark />
        )}
        {children}
      </div>
    </div>
  );
};

export default ListItem;
