import { Display, Heading } from "@/macros/Copy";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";

const Video = ({ videos }) => {
	return (
		<section id={"videos"}>
			<Container size={"lg"} className={"w-full flex justify-between pt-20 pb-12 lg:pt-12"}>
				<Display tag={"h2"} className={``} size={"sm"}>
					Videos
				</Display>
				{/* 
        Note: this section displays resources from multiple sites/locations. 
        A universal outbund link does not exist 
        */}
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
				{videos.map((video) => {
					return (
						<Link
							key={video.id}
							href={video.url}
							className='py-8 px-4 lg:px-10 border-t border-r border-b border-black group hover:bg-black hover:text-white transition-all duration-300 !inline-flex flex-col'
						>
							<Image src={video.image} alt={video.title} width={450} height={260} className={"w-full h-auto block mb-6"} />
							<Heading size={"sm"} tag={"h3"} className={"mb-6 lg:mb-10 line-clamp-2"}>
								{video.title}
							</Heading>
						</Link>
					);
				})}
			</Carousel>
		</section>
	);
};

export default Video;
