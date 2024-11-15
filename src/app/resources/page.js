import TertiaryHero from "@/components/Heroes/TertiaryHero";
import Blog from "@/components/Resources/Blog/Blog";
import Podcast from "@/components/Resources/Podcast/Podcast";
import Video from "@/components/Resources/Video/Video";
import Whitepapers from "@/components/Resources/Whitepapers/Whitepapers";
import CommunityPosts from "@/components/Resources/CommunityPosts/CommunityPosts";
import { getPosts } from "../page";
import { videos } from "@/data/resources/videos";
import { podcasts } from "@/data/resources/podcasts";
import { whitepapers } from "@/data/resources/whitepapers";
import { communityposts } from "@/data/resources/community-posts";

import meta from "@/components/Meta/Meta";
import seo from "@/data/resources/seo";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";
import ScrollNavigationCard from "@/components/ScrollNavigation/ScrollNavigationCard";
import ScrollSection from "@/components/ScrollNavigation/ScrollSection";
import GetInTouch from "@/components/CallToActions/GetInTouch";

export const metadata = meta(seo);

export const anchors = [
  {
    text: "Videos",
    url: "#videos",
  },
  {
    text: "Podcasts",
    url: "#podcasts",
  },
  {
    text: "Whitepapers",
    url: "#whitepapers",
  },
];

export default async function Resources() {
  const blogPosts = await getPosts();

  return (
    <>
      <TertiaryHero
        title={"Resources"}
        pageIndicator={"1-2"}
        buttons={anchors}
        blurbTitle={
          "Explore blog posts, podcasts episodes, YouTube videos, and research papers about the Celestia network."
        }
      />
      <ScrollNavigation>
        <ScrollSection index={0}>
          <ScrollNavigationCard index={0}>
            <Blog posts={blogPosts} />
          </ScrollNavigationCard>
        </ScrollSection>
        <ScrollSection index={1}>
          <ScrollNavigationCard index={1}>
            <Podcast posts={podcasts} />
          </ScrollNavigationCard>
        </ScrollSection>
        <ScrollSection index={2}>
          <ScrollNavigationCard index={2}>
            <Video videos={videos} />
          </ScrollNavigationCard>
        </ScrollSection>
        <ScrollSection index={3} className={"!bg-black"}>
          <ScrollNavigationCard index={3}>
            <Whitepapers papers={whitepapers} />
          </ScrollNavigationCard>
        </ScrollSection>
        <ScrollSection index={4}>
          <ScrollNavigationCard index={4}>
            <CommunityPosts posts={communityposts} />
          </ScrollNavigationCard>
        </ScrollSection>
      </ScrollNavigation>
      <GetInTouch />

      {/* WHITEPAPERS */}
      <div className={`pb-10`}>
        <h2 className={``}>Whitepapers</h2>
        {whitepapers.map((post, index) => (
          <a key={index} className={`block`} href={post.url}>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>

      <hr />

      {/* COMMUNITY POSTS */}
      <div className={`pb-10`}>
        <h2 className={``}>Community Posts</h2>
        {communityposts.map((post, index) => (
          <a key={index} className={`block`} href={post.url}>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>
    </>
  );
}

const ResouceCard = ({ resource }) => {
  return (
    <a className={"resource-card"} href={resource.url}>
      <h2>{resource.title}</h2>
      <p>{resource.text}</p>
    </a>
  );
};
