import { Display, Body, Heading } from "@/macros/Copy";
import Container from "../Container/Container";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import Link from "@/macros/Link/Link";
import Carousel from "@/components/Carousel/Carousel";
import VerticalTitleCard from "../Cards/VerticalTitleCards/VerticalTitleCard";

const Podcast = ({ posts }) => {
  return (
    <section>
      <Container
        size={"lg"}
        className={"w-full flex justify-between pt-20 pb-12 lg:pt-12"}
      >
        <Display tag={"h2"} className={``} size={"sm"}>
          Podcasts
        </Display>
        {/* NOTE: Podcasts come from multiple sources; a single outbound link won't work for this row */}
        {/* <Link href={"https://blog.celestia.org/"} className="group">
          <Icon
            Icon={<ArrowLongSVG />}
            hover
            HoverIcon={<ArrowLongSVG />}
            className={`flex-grow-0`}
            direction={`top-right`}
            border
            size={"lg"}
          />
        </Link> */}
      </Container>
      <Carousel>
        {posts.map((post) => {
          const excerpt = removeLinksFromExcerpt(post.excerpt);
          return (
            <Link
              key={post.id}
              href={post.url}
              className="min-h-full my-auto group px-2 !inline-flex flex-col"
            >
              <VerticalTitleCard
                verticalTitle={post.category}
                title={post.title}
                description={excerpt}
                url={post.url}
              />
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

export default Podcast;
