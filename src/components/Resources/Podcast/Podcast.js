import { Display } from "@/macros/Copy";
import Container from "@/components/Container/Container";
import Carousel from "@/components/Carousel/Carousel";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";

const Podcast = ({ posts }) => {
  return (
    <section id={"podcasts"} className=" text-white">
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
      <Carousel hasCardGap dark>
        {posts.map((post, index) => {
          const excerpt = removeLinksFromExcerpt(post.excerpt);
          return (
            <VerticalTitleCard
              dark
              verticalTitle={post.category}
              title={post.title}
              titleClamp={3}
              description={excerpt}
              descriptionClamp={2}
              url={post.url}
              key={index}
            />
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
