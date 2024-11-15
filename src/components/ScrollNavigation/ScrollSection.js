"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import CopyButton from "@/macros/Buttons/CopyButton";

const ScrollSection = ({
  index,
  children,
  id,
  canCopyLink = false,
  ...props
}) => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && canCopyLink) {
      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}${pathname}#${id}`;
      setCurrentUrl(fullUrl);
    }
  }, [pathname, id]);

  return (
    <section
      id={id}
      className={`${index % 2 === 0 ? "bg-white" : "bg-white-weak"} ${
        index > 0 ? "border-t border-black" : null
      }`}
      {...props}
    >
      <Container
        size={"lg"}
        className={`py-12 lg:py-20 ${canCopyLink ? "group" : ""}`}
      >
        {canCopyLink && (
          <div
            className={`lg:opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <CopyButton copy={currentUrl} hover={false} />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

export default ScrollSection;
