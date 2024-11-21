import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import Link from "@/macros/Link/Link";
import ScrollText from "@/components/ScrollText/ScrollText";
import ExploreCardsContainer from "@/components/Cards/ExploreCards/ExploreCardsContainer";
import ExploreCard from "@/components/Cards/ExploreCards/ExploreCard";
import EcosytemExplorer from "@/components/Ecosystem/EcosytemExplorer/EcosytemExplorer";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <PrimaryHero
        title={`The first modular blockchain network`}
        buttons={[{ text: "Build modular", url: "/build" }]}
      />

      <ScrollText gradientText>
        <>Celestia is a modular data</>
        <>availability network that</>
        <>makes it easy for anyone</>
        <>to securely launch their</>
        <>own blockchain.</>
      </ScrollText>

      <AlternatingMediaRows
        rows={[
          {
            title: "Unstoppable apps",
            body: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et egestas purus, eget facilisis magna. Fusce ullamcorper enim mauris.",
              "Sed facilisis, erat ac porta posuere, turpis lacus tincidunt augue, sed suscipit leo orci sit amet arcu",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "secondary" },
              { text: "Deploy", url: "/build#rollups", type: "primary" },
            ],
            videoSrc: "/videos/homepage-buildWhatever.mp4",
          },
          {
            title: "Full-stack Customizability",
            body: [
              "Deploy fast. Launch a blockchain with leading Ethereum rollup frameworks or transform nearly any VM into your own sovereign chain.",
              "With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "secondary" },
              { text: "Deploy", url: "/build#rollups", type: "primary" },
            ],
            videoSrc: "/videos/homepage-buildWhatever.mp4",
          },
          {
            title: "Celestia underneath",
            body: [
              <>
                Tap into the abundant throughput enabled by{" "}
                <Link
                  href={"/what-is-celestia/#what-is-data-availability-sampling"}
                >
                  data availability sampling (DAS)
                </Link>
                , the first architecture that scales while maintaining
                verifiability for any user.
              </>,
              <>
                Anyone can directly verify and contribute to Celestia by{" "}
                <Link href={"/run-a-light-node/"}>running a light node</Link>.
              </>,
            ],
            buttons: [
              {
                text: "Learn Celestia",
                url: "/what-is-celestia",
                type: "secondary",
              },
            ],
            videoSrc: "/videos/homepage-underneath.mp4",
          },
        ]}
      />

      <ExploreCardsContainer>
        <ExploreCard
          title={"Run a light node"}
          description={
            "Join the first modular data availability network in as little as 2 clicks"
          }
          url={"/run-a-light-node"}
          image={"/images/app/homepage/explore-runALightNode.png"}
        />
        <ExploreCard
          title={"Use Tia"}
          description={
            "Pay for blobspace, secure the network, and participate in governance"
          }
          url={"/what-is-tia"}
          image={"/images/app/homepage/explore-useTia.png"}
        />
        <ExploreCard
          title={"Join the community"}
          description={
            "Join the Celestia community online or hang out at one of the grassroots Modular Meetups"
          }
          url={"/community"}
          image={"/images/app/homepage/explore-joinTheCommunity.png"}
        />
      </ExploreCardsContainer>

      <EcosytemExplorer />

      {/* BLOG */}
      {posts && <Blog posts={posts} />}
    </>
  );
}

export const getPosts = async () => {
  const res = await fetch(
    "https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=6&fields=title,text,feature_image,url,excerpt,published_at&formats=plaintext"
  );
  const responseJson = await res.json();
  const posts = responseJson.posts;

  if (!posts) {
    throw new Error("Failed to fetch blog posts");
  }

  return posts;
};
