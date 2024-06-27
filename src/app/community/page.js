import { socialChannels } from "@/data/community/socialChannels";
import { explore } from "@/data/community/explore";
import { ecosystem } from "@/data/community/ecosystem";

export default async function Community() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>Celestia Community</h1>
        <p className={``}>Discover community hubs, discussion forums, and resources that are used by the global Celestia community.</p>
      </div>

      <hr />

      {/* SOCIAL CHANNELS */}
      <div className={`pb-10`}>
        <h2 className={``}>{socialChannels.title}</h2>
        <p>{socialChannels.description}</p>
        <div className={``}>
          {socialChannels.items.map((item, index) => (
            <a className={"block"} key={index} href={item.url}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      </div>

      <hr />

      {/* EXPLORE */}
      <div className={`pb-10`}>
        <h2 className={``}>{explore.title}</h2>
        <p>{explore.description}</p>
        <div className={``}>
          {explore.items.map((item, index) => (
            <a className={"block"} key={index} href={item.url}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      </div>

      <hr />

      {/* ECOSYSTEM */}
      <div className={`pb-10`}>
        <h2 className={``}>{ecosystem.title}</h2>
        <p>{ecosystem.description}</p>
        <a href={ecosystem.button.url} className={``}>{ecosystem.button.text}</a>
      </div>

    </main >
  );
}