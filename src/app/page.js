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
          { text: "Build modular", url: "/build" },
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
              "Unstoppable applications never break—no matter the pressure. Censorship, scaling surges, or operator corruption? Applications built on Celestia can't be stopped.",
              "Celestia is permissionless, scalable and verifiable by all.",
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
              "Full-stack customizability means total control.",
              "With Celestia’s modular architecture, ambitious builders can craft their own appchains and own the entire infrastructure stack.",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "secondary" },
              { text: "Deploy", url: "/build#rollups", type: "primary" },
            ],
            videoSrc: "/videos/home/CE_BLOB.mp4 ",
          },
          {
            title: "Celestia underneath",
            body: [
              <>
                Celestia is a novel layer one blockchain that only provides
                consensus and{" "}
                <Link
                  href={"/what-is-celestia/#what-is-data-availability-sampling"}
                >
                  data availability
                </Link>
                &mdash;flexible, scalable and trust-minimized.
              </>,
              <>
                With Celestia underneath, a customizable blockchain becomes as
                easy to deploy as a smart contract.
              </>,
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
            "Directly verify and join the network by running a light node in two commands"
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
          description={"Join the Celestia community online or IRL"}
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
