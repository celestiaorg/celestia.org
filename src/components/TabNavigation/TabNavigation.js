"use client";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Link from "next/link";

const TabNavigation = ({ navigation }) => {
  return (
    <nav className={`w-full border-b border-black`}>
      <Container size={"lg"} className="overflow-visible" padding={false}>
        <div className="flex overflow-x-scroll w-auto mx-auto gap-2 p-4 ">
          {Object.keys(navigation).map((tab, index) => (
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
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default TabNavigation;
