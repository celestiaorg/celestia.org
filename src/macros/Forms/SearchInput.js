import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import SearchSVG from "../SVGs/SearchSVG";

const SearchInput = ({ value, onChange, placeholder = "Search", ...props }) => (
  <div className="w-full block relative">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-sm leading-[1.2857] w-full py-3 pl-4 pr-8 border-b border-black-pure focus:outline-none focus:border-primary"
      {...props}
    />
    <Icon
      Icon={<SearchSVG />}
      hover={false}
      className={`!absolute right-0 top-1/2 transform -translate-y-1/2`}
      direction="up"
      border={false}
      size={"sm"}
      transparentBg
    />
  </div>
);
export default SearchInput;
