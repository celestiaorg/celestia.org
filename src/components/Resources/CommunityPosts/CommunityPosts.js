import { Display, Body, Heading } from "@/macros/Copy";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import { formatDateToMonthDayYear } from "@/utils/formatDate";

const CommunityPosts = ({ posts }) => {
  return (
    <section>
      <Container
        size={"lg"}
        className={"w-full flex justify-between pt-20 pb-12 lg:pt-12"}
      >
        <Display tag={"h2"} className={``} size={"sm"}>
          Community Posts
        </Display>
      </Container>
      <Carousel>
        {posts.map((post) => {
          const excerpt = removeLinksFromExcerpt(post.excerpt);

          return (
            <Link
              key={post.id}
              href={post.url}
              className="py-8 px-4 lg:px-10 border-t border-r border-b border-black group hover:bg-black hover:text-white transition-all duration-300 !inline-flex flex-col"
            >
              <div className={"w-full flex justify-between mb-6"}>
                <Body size={"sm"}>{post.category}</Body>
                {post.date && (
                  <Body size={"sm"}>{formatDateToMonthDayYear(post.date)}</Body>
                )}
              </div>
              <div className={"relative w-full h-[200px] mb-6"}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={"w-full h-auto max-h-[200px] block"}
                />
              </div>
              <Heading size={"sm"} tag={"h3"} className={"mb-6 lg:mb-10"}>
                {post.title}
              </Heading>
              <Body
                size={"sm"}
                className={
                  "text-black-subtle group-hover:text-white mb-0 mt-auto"
                }
              >
                {excerpt}
              </Body>
            </Link>
          );
        })}
      </Carousel>
    </section>
  );
};

function removeLinksFromExcerpt(excerpt) {
  // Regular expression to match URLs in square brackets
  const urlRegex = /\[https?:\/\/[^\]]+\]/g;
  // Replace URLs with an empty string
  return excerpt.replace(urlRegex, "");
}

export default CommunityPosts;
