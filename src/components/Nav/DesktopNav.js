import { useState, useEffect } from "react";
import MenuData from "./data";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

const DesktopNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <nav className="hidden lg:flex ml-auto mr-0">
      <ul className="flex gap-4 items-center w-full">
        {MenuData.map((menu, index) => (
          <li key={menu.name} className="flex-grow-1">
            <PrimaryButton
              href={menu.href}
              size="md"
              className={"bg-transparent text-black"}
              border={false}
              lightMode
              onClick={() => setActiveDropdown(index)}
            >
              {menu.name}
            </PrimaryButton>
            {activeDropdown === index && (
              <div className="absolute top-full left-0 w-full bg-white">
                <ul className="flex flex-col gap-4 p-4">
                  {menu.items.map((item) => (
                    <li key={item.name}>
                      <PrimaryButton
                        href={item.href}
                        size="sm"
                        className={"bg-transparent text-black"}
                        border={false}
                      >
                        {item.name}
                      </PrimaryButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
