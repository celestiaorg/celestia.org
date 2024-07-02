import { resources } from "@/data/resources/resources";
import { videos } from "@/data/resources/videos";
import { podcasts } from "@/data/resources/podcasts";
import { whitepapers } from "@/data/resources/whitepapers";
import { communityposts } from "@/data/resources/community-posts";

export const anchors = [
    {
        text: 'Videos',
        anchor: 'videos'
    }, {
        text: 'Podcasts',
        anchor: 'podcasts'
    }, {
        text: 'Whitepapers',
        anchor: 'whitepapers'
    },
]

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
    }

    return (
        <main className={`flex min-h-screen flex-col p-24`}>
            {/* HERO */}
            <div className={`pb-10`}>
                <h1 className={``}>Resources</h1>
                {anchors.map((anchor, index) => {
                    return (
                        <a key={index} href={`#${anchor.anchor}`}>{anchor.text}</a>
                    )
                })}
            </div>

            <hr />

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

            {/* BLOG */}
            <div className={`pb-10`}>
                <h2 className={``}>Blog</h2>
                {blogPosts.map((post, index) => (
                    <a key={index} className={`block`} href={post.url}>
                        <h3>{post.title}</h3>
                    </a>
                ))}
            </div>

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

        </main >
    );
}

const ResouceCard = ({ resource }) => {
    return (
        <a className={"resource-card"} href={resource.url}>
            <h2>{resource.title}</h2>
            <p>{resource.text}</p>
        </a>
    );
}

export const getPosts = async () => {
    const res = await fetch('https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=10&fields=title,text,feature_image,url');
    const responseJson = await res.json();
    const posts = responseJson.posts;

    if (!posts) {
        throw new Error('Failed to fetch blog posts')
    }

    return posts;
}