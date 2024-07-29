import { faqs } from "@/data/faq/faqs";
import TertiaryHero from "@/components/Heroes/TertiaryHero";
import GetInTouch from "@/components/CallToActions/GetInTouch";
import FAQAccordion from "@/components/Accordion/FAQAccordion";

export default async function FAQs() {
  return (
    <>
      <TertiaryHero
        title={"FAQ"}
        pageIndicator={"1-2"}
        blurbTitle={"Frecuently asked questions and answers"}
      />
      {/* FAQs */}
      <FAQAccordion faqData={faqs} />
      <GetInTouch />
    </>
  );
}

const FAQ = ({ faq }) => {
  return (
    <div className={"faq-item"}>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>
    </div>
  );
};
