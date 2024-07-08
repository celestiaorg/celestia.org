import getPostsMetadata from "@/lib/getPostsMetadata";

export default async function Glossary() {
  const glossaryPages = getPostsMetadata('glossary');

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>Glossary Page</h1>
        <ol>
          {glossaryPages.map((page) => (
            <li key={page.slug}>
              <a href={`/glossary/${page.slug}`}>
                <h4>{page.title} - {page.desctiption}</h4>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </main >
  );
}