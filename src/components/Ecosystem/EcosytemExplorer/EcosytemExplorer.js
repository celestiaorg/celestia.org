import { Display } from "@/macros/Copy";
import Image from "next/image";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Link from "@/macros/Link/Link";

const EcosytemExplorer = () => {
  return (
    <section className="py-6 px-4 lg:py-10 md:px-10">
      <Display
        tag={"h2"}
        size={"sm"}
        className={"text-center uppercase relative z-20 text-5xl"}
      >
        Explore the
        <br />
        Celestia
        <br />
        Ecosystem{" "}
      </Display>
      <div className="block w-[82%] max-w-[520px] mx-auto relative z-10 pb-32 lg:pb-8 -mt-12 lg:-mt-14">
        <Image
          src={"/images/app/homepage/ecosystem-celestiaLogo.png"}
          alt={"Celestia Logo"}
          width={520}
          height={520}
          className="w-full h-auto"
        />
      </div>
      <Link href={"/ecosystem"}>
        <PrimaryButton className={"mx-auto table"} size="lg" dark>
          View All <span className={"sr-only"}>Ecosystem Projects</span>
        </PrimaryButton>
      </Link>
    </section>
  );
};

export default EcosytemExplorer;
