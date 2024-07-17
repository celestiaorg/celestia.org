import { Display } from "@/macros/Copy";
import Container from "../Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import Link from "next/link";

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
      {posts.map((post) => {
        console.log("post -", post);
        return (
          <a
            key={post.id}
            href={post.url}
            className={`block border border-blue-600 mb-4 rounded-md`}
          >
            <img
              src={post.feature_image}
              alt={post.title}
              width={200}
              height={200}
            />
            <h3>{post.title}</h3>
          </a>
        );
      })}
    </section>
  );
};

export default Blog;
