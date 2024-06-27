import { faqs } from "@/data/faq/faqs";

export default async function FAQs() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>FAQ</h1>
      </div>

      <hr />

      {/* FAQs */}
      <div className={"row faq-content mb-5"}>
        {faqs.map((faq) => (
          <div className={"col col-12"} key={faq.id}>
            <FAQ faq={faq} />
          </div>
        ))}
        <div className={"clear"} />
      </div>

    </main >
  );
}

const FAQ = ({ faq }) => {
  return (
    <div className={"faq-item"}>
      <h2>{faq.question}</h2>
      <p>{faq.text}</p>
    </div>
  );
}