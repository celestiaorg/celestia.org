import TertiaryHero from "@/components/Heroes/TertiaryHero";
import Blog from "@/components/Blog/Blog";
import Podcast from "@/components/Podcast/Podcast";
import { getPosts } from "../page";
import { resources } from "@/data/resources/resources";
import { videos } from "@/data/resources/videos";
import { podcasts } from "@/data/resources/podcasts";
import { whitepapers } from "@/data/resources/whitepapers";
import { communityposts } from "@/data/resources/community-posts";

import meta from "@/components/Meta/Meta";
import seo from "@/data/resources/seo";
import ScrollNavigation from "@/components/ScrollNavigation/ScrollNavigation";
import ScrollNavigationCard from "@/components/ScrollNavigation/ScrollNavigationCard";
import ScrollSection from "@/components/ScrollNavigation/ScrollSection";

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

  const getContent = (id) => {
    var content = "";
    switch (resources[id].category) {
      case "blog":
        content = blogPosts[resources[id].id];
        break;
      case "video":
        content = videos[resources[id].id];
        break;
      case "podcast":
        content = podcasts[resources[id].id];
        break;
      case "whitepaper":
        content = whitepapers[resources[id].id];
        break;
      default:
        content = resources[id];
        break;
    }
    return content;
  };

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
      </ScrollNavigation>

      {/* HIGH LEVEL RESOURCES */}
      <ResouceCard resource={getContent(0)} />
      <ResouceCard resource={getContent(1)} />
      <ResouceCard resource={getContent(2)} />
      <ResouceCard resource={getContent(3)} />
      <ResouceCard resource={getContent(4)} />
      <ResouceCard resource={getContent(5)} />
      <ResouceCard resource={getContent(6)} />
      <ResouceCard resource={getContent(7)} />
      <ResouceCard resource={getContent(8)} />

      <hr />

      {/* VIDEO */}
      <div className={`pb-10`}>
        <h2 className={``}>Video</h2>
        {videos.map((post, index) => (
          <a key={index} className={`block`} href={post.url}>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>

      <hr />

      {/* PODCASTS */}
      <div className={`pb-10`}>
        <h2 className={``}>Podcasts</h2>
        {podcasts.map((post, index) => (
          <a key={index} className={`block`} href={post.url}>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>

      <hr />

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
