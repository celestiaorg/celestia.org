"use client";
import { useState } from "react";
import Icon from "@/macros/Icons/Icon";
import CopySVG from "@/macros/SVGs/CopySVG";
import { motion, AnimatePresence } from "framer-motion";

const CopyButton = ({ copy, hover = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500); // Tooltip disappears after 2 seconds
    });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className="group mb-2.5 active:scale-[0.8] transition-transform"
      >
        <Icon
          Icon={<CopySVG />}
          dark={false}
          hover={hover}
          border
          HoverIcon={<CopySVG dark />}
          size={"sm"}
        />
      </button>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform mb-1 bg-black-subtle text-white text-xs px-2 py-1 rounded opacity-90"
          >
            Copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;
