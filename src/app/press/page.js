const content = {
  title: "Press & Media",
  text: "",
  items: [
    {
      id: 1,
      title: "Branding",
      text: "",
      image: "press/branding.png",
      type: "external",
      figma: false,
      color: "#F3ECFF",
      url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj/guidelines/",
    },
    {
      id: 2,
      title: "News",
      text: "",
      image: "press/news.png",
      type: "external",
      figma: false,
      color: "#DEF7FF",
      url: "https://blog.celestia.org/",
    },
    {
      id: 3,
      title: "Social channels",
      text: "",
      image: "press/social.png",
      type: "internal",
      figma: false,
      color: "#E7FFD4",
      url: "/community/",
    },
    {
      id: 4,
      title: "Enquiries",
      text: "",
      image: "press/enquiries.png",
      type: "external",
      figma: false,
      color: "#FFF2E1",
      url: "mailto:press@celestia.org",
    },
  ],
};

export default async function Press() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>{content.title}</h1>
        <p className={``}>{content.text}</p>
      </div>

      <hr />

      {/* ITEMS */}
      <div className={`pb-10`}>
        <div className={``}>
          {content.items.map((item, index) => (
            <a className={"block"} key={index} href={item.url}>
              <p>{item.title}</p>
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      </div>
    </main >
  );
}