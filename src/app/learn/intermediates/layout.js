import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TabNavigation from "@/components/TabNavigation/TabNavigation";

export default function IntermediatesLayout({ children }) {
  const routeTabNavigation = {
    "Modular and monolithic blockchains":
      "/learn/intermediates/modular-and-monolithic-blockchains",
    "Benefits of modular blockchains":
      "/learn/intermediates/benefits-of-modular-blockchains",
    "The modular stack": "/learn/intermediates/the-modular-stack",
    "Modular software vs modular blockchains":
      "/learn/intermediates/the-differences-of-modular-software",
    "An introduction to sovereign rollups":
      "/learn/intermediates/sovereign-rollups-an-introduction",
    "Misconceptions of sovereign rollups":
      "/learn/intermediates/sovereign-rollups-misconceptions",
    "Settlement in the modular stack":
      "/learn/intermediates/settlement-in-the-modular-stack",
  };

  return (
    <>
      <TertiaryHero
        title={"Modular blockchains for Intermediates"}
        pageIndicator={"1-2"}
        blurbTitle={"The Future of Scalable, Efficient Systems"}
        blurbCopy={
          "Modular blockchains enhance scalability and efficiency by dividing tasks among specialized layers, unlike monolithic chains that handle everything. This approach promises better performance for a large number of users."
        }
      />
      <TabNavigation navigation={routeTabNavigation} />
      <div className="relative">{children}</div>
      <div id={"learn-bottom"} />
    </>
  );
}
