import getPostsMetadata from "@/lib/getPostsMetadata";
import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";

const getGlossaryContent = (slug) => {
  const directory = `src/content/glossary/`;
  const fullPath = `${directory}${slug}.md`;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResults = matter(fileContents);

  return matterResults;
};

const GloassaryPage = (props) => {
  const { slug } = props.params;
  const post = getGlossaryContent(slug);

  return (
    <div>
      <h1>Glossary Page - {post.data.title}</h1>
      <Markdown>{post.content}</Markdown>
    </div>
  );
};

export function generateStaticParams() {
  const glossaryPages = getPostsMetadata("glossary");
  return glossaryPages.map((page) => ({ slug: page.slug }));
}

export default GloassaryPage;
