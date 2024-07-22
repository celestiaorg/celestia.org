"use client";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState } from "react";
import Link from "next/link";

const TabNavigation = ({ navigation }) => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const tab = Object.keys(navigation).find(
      (tab) => navigation[tab] === pathname
    );
    setCurrentTab(tab);
  }, [pathname, navigation]);

  return (
    <nav className={`w-full border-b border-black`}>
      <Container size={"lg"} className="overflow-visible" padding={false}>
        <div className="flex overflow-x-scroll w-auto mx-auto gap-2 p-4 ">
          {Object.keys(navigation).map((tab, index) => (
            <>
              {currentTab === tab ? (
                <PrimaryButton className={"whitespace-nowrap"} hover={false}>
                  {tab}
                </PrimaryButton>
              ) : (
                <Link
                  href={navigation[tab]}
                  className={"inline-block"}
                  key={index}
                  prefetch
                >
                  <PrimaryButton lightMode className={"whitespace-nowrap"}>
                    {tab}
                  </PrimaryButton>
                </Link>
              )}
            </>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default TabNavigation;
