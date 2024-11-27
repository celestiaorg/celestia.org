import { useState, useEffect, useRef } from "react";
import MenuData from "./data";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Icon from "@/macros/Icons/Icon";
import DropdownArrow from "@/macros/SVGs/DropdownArrow";
import { Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import { motion, AnimatePresence } from "framer-motion";

const DesktopNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navRef = useRef(null);

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll behavior to close dropdown if scrolled more than 50px
  useEffect(() => {
    const handleScroll = () => {
      if (
        activeDropdown !== null &&
        Math.abs(window.scrollY - scrollPosition) > 50
      ) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeDropdown, scrollPosition]);

  // Handle dropdown selection
  const handleDropdownSelection = () => {
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
      setScrollPosition(window.scrollY);
    }
  };

  return (
    <nav ref={navRef} className="hidden lg:flex ml-auto mr-0">
      <ul className="flex gap-2 items-center w-full">
        {MenuData.map((menu, index) => (
          <li key={menu.name} className="flex-grow-1 relative">
            {menu.type === "dropdown" ? (
              <PrimaryButton
                size="md"
                className={`bg-transparent !text-black ${
                  activeDropdown === index ? "!bg-white-pure" : ""
                }`}
                noBorder
                onClick={() => handleDropdownToggle(index)}
                isActive={activeDropdown === index}
                aria-expanded={activeDropdown === index}
                aria-haspopup="true"
                aria-controls={`dropdown-menu-${index}`}
              >
                <div
                  className={
                    "w-full inline-flex justify-between items-center group gap-2"
                  }
                >
                  <span>{menu.name}</span>
                  <Icon
                    Icon={<DropdownArrow />}
                    hover
                    HoverIcon={<DropdownArrow dark />}
                    className={`flex-grow-0 flex-shrink-0`}
                    direction="up"
                    border={false}
                    size={"xs"}
                    transparentBg
                  />
                </div>
              </PrimaryButton>
            ) : (
              <PrimaryButton
                href={menu.href}
                size="md"
                className={"bg-transparent !text-black"}
                noBorder
                onClick={handleDropdownSelection}
              >
                {menu.name}
              </PrimaryButton>
            )}

            <AnimatePresence>
              {activeDropdown === index && (
                <motion.div
                  initial={{ opacity: 0, y: 30, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, y: 10 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="absolute top-full left-1/2 w-64 bg-white-pure rounded-[.25rem] border-white-weak shadow-sm translate-y-2.5 -translate-x-1/2"
                  id={`dropdown-menu-${index}`}
                  role="menu"
                >
                  <ul className="flex flex-col p-4">
                    {menu.items.map((item) => (
                      <li key={item.name} role="menuitem">
                        <Link
                          href={item.url || ""}
                          className={
                            "text-black block p-2 hover:bg-white-weak focus:bg-white-weak rounded-[.25rem] transition"
                          }
                          onClick={handleDropdownSelection}
                        >
                          <Body size="sm">{item.name}</Body>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
