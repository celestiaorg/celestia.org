import { socialChannels } from "@/data/community/socialChannels";
import { explore } from "@/data/community/explore";
import { ecosystem } from "@/data/community/ecosystem";

const content = {
  title: "Careers",
  subtitle:
    "We’re on a mission to change the way that blockchains and decentralized applications are built—making them more secure, sovereign and scalable.",
  text: "Join our team of leading engineers, researchers and entrepreneurs in pioneering the first modular blockchain design.",
  button: {
    text: "Current openings",
    url: "",
  },
  perks: {
    title: "Perks",
    perks: [
      {
        title: "Employment benefits",
        image: "careers/careers-1.svg",
      },
      {
        title: "4 weeks annual vacation",
        image: "careers/careers-2.svg",
      },
      {
        title: "Meaningful long-term compensation package",
        image: "careers/careers-3.svg",
      },
      {
        title: "Flexible and remote work environment",
        image: "careers/careers-4.svg",
      },
    ],
  },
};

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