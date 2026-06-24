import { Body } from "@/macros/Copy";

interface CategoryPillProps {
  children: React.ReactNode;
  hover?: boolean;
}

const CategoryPill = ({ children, hover = false }: CategoryPillProps) => {
  return (
    <Body
      size={"xs"}
      className={`whitespace-nowrap bg-white-weak text-black-subtle rounded-full px-3 py-1
            ${
              hover
                ? "group-hover:bg-black-subtle group-hover:text-white hover:duration-100 group-hover:duration-100 duration-300"
                : ""
            }
        `}
    >
      {children}
    </Body>
  );
};

export default CategoryPill;
