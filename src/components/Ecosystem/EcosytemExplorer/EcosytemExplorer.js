import { Display } from "@/macros/Copy";
import Image from "next/image";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import { ecosystemItems } from "@/data/ecosystem/ecosystem";
import Link from "next/link";
import "./EcosystemExplorer.scss";
import { stringToId } from "@/utils/stringToId";

const EcosytemExplorer = () => {
  // randomly select 22 ecosystem items and mix them up
  const randomEcosystemItems = ecosystemItems.sort(() => Math.random() - 0.5);

  // split the 22 ecosystem items into 12 foregroundItems and 10 backgroundItems
  const foregroundItems = randomEcosystemItems.slice(0, 12);
  const backgroundItems = randomEcosystemItems.slice(12, 22);

  return (
    <section className="ecosystem-explorer py-6 px-4 lg:py-10 md:px-10">
      <Display
        tag={"h2"}
        size={"sm"}
        className={"text-center uppercase relative z-20 text-5xl"}
      >
        Explore the
        <br />
        Ecosystem
      </Display>
      <div className="block w-[82%] max-w-[520px] mx-auto relative z-10 pb-32 lg:pb-8 -mt-12 lg:-mt-14">
        {/* background items */}
        <div className="background-icons absolute top-0 left-0 w-full h-full z-[2]">
          {backgroundItems.map((item, index) => (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 item-${index + 1}`}
            >
              <div className="relative block transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative transform vertical-anim">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-auto max-w-12"
                  />
                  <span className="sr-only">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Image
          src={"/images/app/homepage/ecosystem-celestiaLogo.png"}
          alt={"Celestia Logo"}
          width={520}
          height={520}
          className="w-full h-auto relative z-[3]"
        />
        {/* foreground items */}
        <div className="foreground-icons absolute top-0 left-0 w-full h-full z-[4]">
          {foregroundItems.map((item, index) => (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 item-${index + 1}`}
            >
              <Link
                href={`/ecosystem/#${stringToId(item.title)}`}
                className="relative block transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative transform vertical-anim">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-auto max-w-16"
                  />
                  <span className="sr-only">{item.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <SecondaryButton
        href={"/ecosystem"}
        className={"mx-auto table"}
        size="lg"
        dark
      >
        View All <span className={"sr-only"}>Ecosystem Projects</span>
      </SecondaryButton>
    </section>
  );
};

export default EcosytemExplorer;
