import PrimaryHero from "@/components/Heroes/PrimaryHero";
import JoinTheCommunity from "@/components/JoinTheCommunity/JoinTheCommunity";
import Blog from "@/components/Blog/Blog";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {/* HERO */}
      <PrimaryHero
        title={`The first modular blockchain network`}
        buttons={[
          { text: 'Build modular', url: '/build' }
        ]}
      />
      <div className={`pb-10`}>
        <h1 className={``}></h1>
        <p className={``}>Celestia is a modular data availability network that makes it easy for anyone to securely launch their own blockchain.</p>
        <a className={``} href={`/build`}>Build modular</a>
        <a className={``} href={`/explore-celestia`}>Explore</a>
      </div>

      {/* BUILD */}
      <div className={`pb-10`}>
        <h2 className={``}>Build whatever</h2>
        <p>Deploy fast. Launch a blockchain with leading Ethereum rollup frameworks or transform nearly any VM into your own sovereign chain.</p>
        <p>With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.</p>
        <a className={``} href={`/build`}>Build modular</a>
        <a className={``} href={`/build#deploy`}>Deploy</a>
      </div>

      {/* ACCESS */}
      <div className={`pb-10`}>
        <h2 className={``}>Access abundance</h2>
        <p>Tap into the abundant throughput enabled by <a href='https://celestia.org/what-is-celestia/#what-is-data-availability-sampling' target='_blank' rel='noopener noreferrer'>data availability sampling (DAS)</a>, the first architecture that scales while maintaining verifiability for any user.</p>
        <p>Anyone can directly verify and contribute to Celestia by <a href='https://celestia.org/run-a-light-node/' target='_blank' rel='noopener noreferrer'>running a light node</a>.</p>
        <a className={``} href={`/what-is-celestia`}>Learn Celestia</a>
      </div>

      {/* EXPLORE */}
      <div className={`pb-10`}>
        <h2 className={``}>Explore Celestia</h2>
        <ul>
          <li>
            <a className={``} href={`/ecosystem`}>
              <h3 className={``}>Explore the ecosystem</h3>
              <p>Explore Celestia’s ecosystem of rollups and modular infrastructure</p>
            </a>
          </li>
          <li>
            <a className={``} href={`/what-is-tia`}>
              <h3 className={``}>Use Tia</h3>
              <p>Pay for blobspace, secure the network, and participate in governance</p>
            </a>
          </li>
          <li>
            <a className={``} href={`/run-a-light-node`}>
              <h3 className={``}>Run a light node</h3>
              <p>Join the first modular data availability network in as little as 2 clicks</p>
            </a>
          </li>
        </ul>
      </div>

      {/* JOIN THE COMMUNITY */}
      <JoinTheCommunity />

      {/* BLOG */}
      {posts &&
        <div className={`pb-10`}>
          <h2 className={``}>Explore Celestia</h2>
          <Blog posts={posts} />
        </div>
      }

    </>
  );
}

export const getPosts = async () => {
  const res = await fetch('https://blog.celestia.org/ghost/api/v3/content/posts/?key=000cf34311006e070b17fffcfd&limit=5&fields=title,text,feature_image,url');
  const responseJson = await res.json();
  const posts = responseJson.posts;

  if (!posts) {
    throw new Error('Failed to fetch blog posts')
  }

  return posts;
}