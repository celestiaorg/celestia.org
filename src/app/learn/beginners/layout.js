import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TabNavigation from "@/components/TabNavigation/TabNavigation";

export default function BeginnersLayout({ children }) {
  const routeTabNavigation = {
    "Modular blockchains for beginners":
      "/learn/beginners/modular-blockchains-for-beginners",
    "The modular stack": "/learn/beginners/the-modular-stack",
    "Values of modular blockchains":
      "/learn/beginners/modular-blockchains-are-user-first",
    "First Principles":
      "/learn/beginners/modular-blockchains-and-first-principles",
  };

  return (
    <>
      <TertiaryHero
        title={"Modular blockchains for beginners"}
        blurbTitle={
          "Modular blockchains are changing the way we think of and build decentralized applications."
        }
        blurbCopy={
          <>
            That’s pretty much what everyone says about their new blockchain
            tech. So, why care about modular blockchains? Why is this time
            different?
            <br />
            <br />
            We could write a whole book about all the fantastic things that
            modular blockchains can do. But most people don’t have time to read
            a whole book, so we wrote this short article instead to give you the
            big picture.
          </>
        }
      />
      <TabNavigation navigation={routeTabNavigation} />
      <div className="relative">{children}</div>
      <div id={"learn-bottom"} />
    </>
  );
}
