import { getPostsMetadata, getPostMetadata } from "@/lib/getPostsMetadata";
import meta from "@/components/Meta/Meta";

const GloassaryPage = (props) => {
  return <></>;
};

export async function generateMetadata({ params }) {
  const metaData = await getPostMetadata("glossary", `${params.slug}.md`);

  return meta(metaData);
}

export function generateStaticParams() {
  const glossaryPages = getPostsMetadata("glossary");
  const paths = glossaryPages.map((page) => ({ slug: page.slug }));

  return paths;
}

export default GloassaryPage;
