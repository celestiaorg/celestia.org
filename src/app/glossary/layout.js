import TertiaryHero from "@/components/Heroes/TertiaryHero";
import { getPostsMetadata } from "@/lib/getPostsMetadata";
import GlossaryAccordion from "@/components/Accordion/GlossaryAccordion";

export default async function GlossaryLayout({ children }) {
  const glossaryPages = getPostsMetadata("glossary");

  return (
    <>
      <TertiaryHero
        title={"Glossary"}
        blurbTitle={
          "Explore our extensive glossary. Enhance your understanding of terminology."
        }
      />
      <GlossaryAccordion glossaryData={glossaryPages} />
      {children}
    </>
  );
}
