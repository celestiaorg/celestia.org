import { Heading, Body } from "@/macros/Copy";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const ExploreCard = ({ title, description, image, url, videoSrc }) => {
  return (
    <Link href={url}>
      <div className={` p-4`}>
        <Image src={image} alt={""} width={100} height={100} />
        <div className={`block relative h-20 w-20`}>
          <VideoPlayer src={videoSrc} />
        </div>
        <Heading tag={"h3"} className={`text-white mb-4`}>
          {title}
        </Heading>
        <Body size={"md"} className={`text-weak`}>
          {description}
        </Body>
      </div>
    </Link>
  );
};

export default ExploreCard;
