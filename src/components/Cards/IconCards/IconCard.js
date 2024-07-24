import { Body } from "@/macros/Copy";
import Link from "next/link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import XTwitterSVG from "@/macros/SVGs/XTwitterSVG";
import DiscordSVG from "@/macros/SVGs/DiscordSVG";
import TelegramSVG from "@/macros/SVGs/TelegramSVG";
import RedditSVG from "@/macros/SVGs/RedditSVG";
import GithubSVG from "@/macros/SVGs/GithubSVG";
import ForumSVG from "@/macros/SVGs/ForumSVG";
import YoutubeSVG from "@/macros/SVGs/YoutubeSVG";
import PodcastSVG from "@/macros/SVGs/PodcastSVG";
import ResourcesSVG from "@/macros/SVGs/ResourcesSVG";
import BlogSVG from "@/macros/SVGs/BlogSVG";
import EmailSVG from "@/macros/SVGs/EmailSVG";
import SocialSVG from "@/macros/SVGs/SocialSVG";
import { Label } from "@/macros/Copy";

const IconCard = ({ title, description, url, dark = false, icon }) => {
  const svgs = {
    arrow: ArrowLongSVG,
    twitter: XTwitterSVG,
    discord: DiscordSVG,
    telegram: TelegramSVG,
    reddit: RedditSVG,
    github: GithubSVG,
    forum: ForumSVG,
    youtube: YoutubeSVG,
    podcast: PodcastSVG,
    resources: ResourcesSVG,
    blog: BlogSVG,
    email: EmailSVG,
    social: SocialSVG,
  };

  const SVG = svgs[icon] || null;

  return (
    <Link
      href={url}
      className={`flex w-full rounded-xl group border transition-colors duration-300 delay-0 py-3.5 px-4 gap-4 ${
        dark
          ? "bg-black text-white border-white hover:border-black hover:bg-white hover:text-black"
          : "bg-white text-black border-black hover:border-white hover:bg-black hover:text-white"
      }`}
    >
      <div
        className={`w-10 relative grow-0 shrink-0 flex items-center content-center transition-all duration-300`}
      >
        {SVG && (
          <Icon
            Icon={<SVG dark={dark} />}
            hover
            HoverIcon={<SVG dark={!dark} />}
            className={`flex-grow-0 self-center justify-self-center`}
            direction={`top`}
            border={false}
            dark={dark}
            transparentBg
            size={"md"}
          />
        )}
      </div>
      <div className={`content-center`}>
        <Label
          tag={"h3"}
          size={"lg"}
          className={`block transition-colors duration-300 ${
            dark
              ? "text-white group-hover:text-black"
              : "text-black group-hover:text-white"
          }`}
        >
          {title}
        </Label>
        <Body size={"sm"} className={`text-pretty`}>
          {description}
        </Body>
      </div>
      <div
        className={`w-10 relative grow-0 shrink-0 flex items-center content-center transition-all duration-300 mr-0 ml-auto`}
      >
        <Icon
          Icon={<ArrowLongSVG dark={!dark} />}
          hover
          HoverIcon={<ArrowLongSVG dark={dark} />}
          className={`flex-grow-0 self-center justify-self-center`}
          direction={`top-right`}
          border={false}
          dark={dark}
          transparentBg
          size={"md"}
        />
      </div>
    </Link>
  );
};

export default IconCard;
