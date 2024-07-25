"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import JumpNav from "./JumpNav";
import MenuData from "./data";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Link from "@/macros/Link/Link";
import { useScrollPosition } from "@/utils/scrollLock";
import NavDropdown from "./NavDropdown";
import Container from "../Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

const Nav = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const controls = useAnimation();
  const { setScrollIsLocked, menuIsOpen, setMenuIsOpen } = useScrollPosition();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (!hasScrolled) {
          setHasScrolled(true);
          controls.start({ backgroundColor: "#F6F6F6" });
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          controls.start({ backgroundColor: "rgba(255,255,255,0)" });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled, controls]);

  useEffect(() => {
    setScrollIsLocked(menuIsOpen);
  }, [menuIsOpen, setScrollIsLocked]);

  return (
    <>
      <JumpNav />
      <motion.header
        initial={{ backgroundColor: "rgba(255,255,255,0)" }}
        animate={controls}
        className={`fixed top-0 left-0 w-full z-50`}
      >
        <Container size={"lg"}>
          <div
            className={`relative w-full flex justify-between items-center py-6 z-50 filter ${
              menuIsOpen ? "invert" : ""
            } transition-all duration-300`}
          >
            <Link href={`/`}>
              <img
                src={`/images/celestia-logo.svg`}
                alt={`Celestia logo | Home`}
                className={`w-full h-auto max-w-32`}
              />
            </Link>
            <PrimaryButton onClick={() => setMenuIsOpen(!menuIsOpen)} lightMode>
              {menuIsOpen ? (
                <>
                  Close <span className={`sr-only`}>the main</span>
                </>
              ) : (
                <>
                  <span className={`sr-only`}>Open the main</span> menu
                </>
              )}
            </PrimaryButton>
          </div>
        </Container>
        <AnimatePresence>
          {menuIsOpen && (
            <motion.div
              className={`bg-black text-white fixed top-0 left-0 h-screen w-screen z-40 pt-28 lg:pt-48`}
              initial={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              exit={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(10px)",
                transition: {
                  duration: 0.35,
                  ease: "easeOut",
                },
              }}
            >
              <Container
                size={"xl"}
                className={`block md:flex md:gap-10 h-full`}
              >
                <div
                  className={`w-full sm:w-3/5 md:w-1/2 lg:w-1/3 h-full overflow-y-scroll no-scrollbar`}
                >
                  {MenuData.map((item, index) => {
                    return (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 1.1,
                          x: -20,
                          transformOrigin: "center left",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          transition: {
                            duration: 0.25,
                            delay: 0.25 + 0.07 * index,
                            ease: "easeOut",
                          },
                        }}
                        key={`menu-item-${index}`}
                        className={`mb-10`}
                      >
                        {item.type === "dropdown" && (
                          <NavDropdown name={item.name} items={item.items} />
                        )}
                        {item.type === "link" && (
                          <Link
                            href={item.url}
                            className="w-full text-white no-underline"
                          >
                            <MenuLabel>{item.name}</MenuLabel>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <div className={`w-full sm:w-2/5 md:w-1/2 lg:w-2/3`}>
                  3d models and icons will go here.
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

const MenuLabel = ({ children }) => {
  return (
    <div className={`w-full flex justify-between items-center group shrink-0`}>
      <h2 className={`text-4xl lg:text-6xl grow-1`}>{children}</h2>
      <Icon
        Icon={<ArrowLongSVG dark />}
        hover
        HoverIcon={<ArrowLongSVG dark />}
        className={`shrink-0 grow-0`}
        direction={`down-right`}
        border
        size={"md"}
        dark
      />
    </div>
  );
};

export default Nav;
