import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import { Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import HomepageScrollText from "@/components/ScrollText/views/HomepageScrollText";
import ExploreCardsContainer from "@/components/Cards/ExploreCards/ExploreCardsContainer";
import ExploreCard from "@/components/Cards/ExploreCards/ExploreCard";
import EcosytemExplorer from "@/components/Ecosystem/EcosytemExplorer/EcosytemExplorer";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <PrimaryHero
        headline={`Build whatever`}
        subheadline={
          <>
            Celestia is the modular blockchain powering unstoppable applications
            with <span className={"whitespace-nowrap"}>full-stack</span>{" "}
            customizability.
          </>
        }
        buttons={[
          { text: "Build", url: "/build" },
          { text: "Explore", url: "#explore-celestia" },
        ]}
        videos={{
          src: {
            xl: "/videos/hero/blob-desktop_xl.mp4",
            lg: "/videos/hero/blob-desktop_lg.mp4",
            sm: "/videos/hero/blob-mobile_sm.mp4",
          },
          poster: {
            lg: "/videos/hero/blob-desktop_xl_poster.jpg",
            sm: "/videos/hero/blob-mobile_sm_poster.jpg",
          },
        }}
      />

      <HomepageScrollText />

      <AlternatingMediaRows
        id={"explore-celestia"}
        rows={[
          {
            title: "Unstoppable apps",
            body: [
              "Build apps unconstrained by legacy intermediaries - surpassing what’s possible in Web2. Send money like a meme, create autonomous worlds, or deploy programs that outlive you.",
              "Unlike in previous blockchains, light nodes and DA Sampling enable anyone to verify that applications execute correctly and remove the need to trust centralized, black-box APIs.",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "secondary" },
              { text: "Deploy", url: "/build#rollups", type: "primary" },
            ],
            videoSrc: "/videos/home/CE_MOD.mp4 ",
          },
          {
            title: "Full-stack customizability",
            body: [
              "Celestia’s modular design ensures developers are not confined to a single programming language, virtual-machine, or framework.",
              "Launch fast with leading Ethereum rollup frameworks or deploy your own as a high-performance sovereign network that exceeds your own VM.",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "secondary" },
              { text: "Deploy", url: "/build#rollups", type: "primary" },
            ],
            videoSrc: "/videos/home/CE_BLOB.mp4 ",
          },
          {
            title: "Access Abundance",
            body: [
              "Celestia's minimal design attacks crypto's core scaling bottleneck: data availability.",
              <>
                This enables a{" "}
                <Link href={"https://blog.celestia.org/roadmap/"}>
                  scaling roadmap
                </Link>{" "}
                to 1 Gigabyte blocks - enough data throughput to power many
                high-performance blockchains, Visa-scale payments networks, and
                even fully-onchain worlds.
              </>,
              "In 1-click, deploy your own high-performance blockchains as powerful as leading Layer 1s.",
            ],
            buttons: [
              {
                text: "Learn Celestia",
                url: "/what-is-celestia",
                type: "secondary",
              },
            ],
            videoSrc: "/videos/home/CE_Under.mp4",
          },
        ]}
      />

      <ExploreCardsContainer>
        <ExploreCard
          title={"Run a light node"}
          description={
            "Directly verify and ioin the network by running a licht node in two commands"
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
          title={"Go modular"}
          description={
            "Join the community and meet us at the next modular event."
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
