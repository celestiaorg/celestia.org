import { Display, Body, Heading } from "@/macros/Copy";
import Container from "../Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import Link from "next/link";
import BlogCarousel from "./BlogCarousel";
import Image from "next/image";
import { formatDateToMonthDayYear } from "@/utils/formatDate";

const Blog = ({ posts }) => {
  return (
    <section>
      <Container
        size={"lg"}
        className={"w-full flex justify-between pt-20 pb-12 lg:pt-12"}
      >
        <Display tag={"h2"} className={``} size={"sm"}>
          Blog
        </Display>
        <Link href={"https://blog.celestia.org/"} className="group">
          <Icon
            Icon={<ArrowLongSVG dark />}
            hover
            HoverIcon={<ArrowLongSVG dark />}
            className={`flex-grow-0`}
            direction={`top-right`}
            border
            dark
            size={"lg"}
          />
        </Link>
      </Container>
      <BlogCarousel>
        {posts.map((post) => {
          return (
            <Link
              key={post.id}
              href={post.url}
              className="w-[90vw] lg:w-[25vw] py-8 px-4 lg:px-10 block border-t border-r border-b border-black group hover:bg-black hover:text-white transition-all duration-300"
            >
              <div className={"w-full flex justify-between mb-6"}>
                <Body size={"sm"}>Website</Body>
                <Body size={"sm"}>
                  {formatDateToMonthDayYear(post.published_at)}
                </Body>
              </div>
              <Image
                src={post.feature_image}
                alt={post.title}
                width={450}
                height={260}
                className={"w-full h-auto block mb-6"}
              />
              <Heading size={"sm"} tag={"h3"} className={"mb-6 lg:mb-10"}>
                {post.title}
              </Heading>
              <Body
                size={"sm"}
                className={"text-black-subtle group-hover:text-white"}
              >
                {post.excerpt}
              </Body>
            </Link>
          );
        })}
      </BlogCarousel>
    </section>
  );
};

export default Blog;
