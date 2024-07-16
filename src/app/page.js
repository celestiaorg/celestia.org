import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Blog from "@/components/Blog/Blog";
import AlternatingMediaRows from "@/components/AlternatingMediaRows/AlternatingMediaRows";
import Link from "next/link";
import ScrollText from "@/components/ScrollText/ScrollText";
import ExploreCard from "@/components/Cards/ExploreCard";
import Container from "@/components/Container/Container";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <PrimaryHero
        title={`The first modular blockchain network`}
        buttons={[{ text: "Build modular", url: "/build" }]}
      />

      <ScrollText>
        <>Celestia is a modular data</>
        <>availability network that</>
        <>makes it easy for anyone</>
        <>to securely launch their</>
        <>own blockchain.</>
      </ScrollText>

      <AlternatingMediaRows
        rows={[
          {
            title: "Build whatever",
            body: [
              "Deploy fast. Launch a blockchain with leading Ethereum rollup frameworks or transform nearly any VM into your own sovereign chain.",
              "With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.",
            ],
            buttons: [
              { text: "Build modular", url: "/build", type: "primary" },
              { text: "Deploy", url: "/build#deploy", type: "secondary" },
            ],
            videoSrc: "/videos/homepage-buildWhatever.mp4",
          },
          {
            title: "Access abundance",
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
                type: "primary",
              },
            ],
            videoSrc: "/videos/homepage-underneath.mp4",
          },
        ]}
      />

      <section className={`bg-black`}>
        <Container size={"lg"}>
          <div className="flex gap-6 py-10 lg:py-20 lg:gap-7">
            <ExploreCard
              title={"Run a light node"}
              description={
                "Join the first modular data availability network in as little as 2 clicks"
              }
              url={"/run-a-light-node"}
              image={"/images/app/homepage/explore-runALightNode.png"}
              videoSrc={"/videos/footer.mp4"}
            />
            <ExploreCard
              title={"Use Tia"}
              description={
                "Pay for blobspace, secure the network, and participate in governance"
              }
              url={"/what-is-tia"}
              image={"/images/app/homepage/explore-useTia.png"}
              videoSrc={"/videos/footer.mp4"}
            />
            <ExploreCard
              title={"Join the community"}
              description={
                "Join the Celestia community online or hang out at one of the grassroots Modular Meetups"
              }
              url={"/run-a-light-node"}
              image={"/images/app/homepage/explore-joinTheCommunity.png"}
              videoSrc={"/videos/footer.mp4"}
            />
          </div>
        </Container>
      </section>

      {/* BLOG */}
      {posts && (
        <div className={`pb-10`}>
          <h2 className={``}>Explore Celestia</h2>
          <Blog posts={posts} />
        </div>
      )}
    </>
  );
}

export const getPosts = async () => {
  const res = await fetch(
    "https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=5&fields=title,text,feature_image,url"
  );
  const responseJson = await res.json();
  const posts = responseJson.posts;

  if (!posts) {
    throw new Error("Failed to fetch blog posts");
  }

  return posts;
};
