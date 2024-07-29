import getPostsMetadata from "@/lib/getPostsMetadata";

const GloassaryPage = (props) => {
  return <></>;
};

export function generateStaticParams() {
  const glossaryPages = getPostsMetadata("glossary");
  const paths = glossaryPages.map((page) => ({ slug: page.slug }));
  console.log("paths", paths);
  return paths;
}

export default GloassaryPage;
