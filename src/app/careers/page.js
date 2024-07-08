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

export default async function Careers() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>{content.title}</h1>
        <p className={``}>{content.subtitle}</p>
        <p className={``}>{content.text}</p>
        <a className={``} href={`https://jobs.lever.co/celestia/`}>Current openings</a>
      </div>

      <hr />

      {/* PERKS */}
      <div className={`pb-10`}>
        <h2 className={``}>{content.perks.title}</h2>
        <div className={``}>
          {content.perks.perks.map((perk, index) => (
            <div className={"block"} key={index}>
              <p>{perk.title}</p>
            </div>
          ))}
        </div>
      </div>

    </main >
  );
}