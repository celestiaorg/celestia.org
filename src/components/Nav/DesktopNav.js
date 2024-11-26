import { useState, useEffect } from "react";
import MenuData from "./data";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import { motion, AnimatePresence } from "framer-motion";

const DesktopNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="hidden lg:flex ml-auto mr-0">
      <ul className="flex gap-4 items-center w-full">
        {MenuData.map((menu, index) => (
          <li key={menu.name} className="flex-grow-1 relative">
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
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 30, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, y: 10 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="absolute top-full left-1/2 w-64 bg-white-pure rounded-[.25rem] border-white-weak shadow-sm translate-y-2.5 -translate-x-1/2"
                  onBlur={() => setActiveDropdown(null)}
                >
                  <ul className="flex flex-col p-4">
                    {menu.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.url || ""}
                          className={
                            "text-black block p-2 hover:bg-white-weak focus:bg-white-weak rounded-[.25rem] transition"
                          }
                        >
                          <Body size="sm">{item.name}</Body>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
