import { Body, Display } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

const MediaRow = ({
  title,
  body,
  buttons,
  videoSrc,
  className,
  index,
  totalRows,
}) => {
  const videoRight = index % 2 === 0 ? true : false;
  return (
    <div className={`${className}`}>
      <div
        className={
          "block relative w-full h-[100vw] overflow-hidden lg:w-1/2 lg:h-auto lg:overflow-visible"
        }
      >
        <div
          className={`lg:absolute lg:top-0 ${
            videoRight ? "lg:left-0" : "lg:right-0"
          } lg:h-full lg:w-[50vw]`}
        >
          <VideoPlayer src={videoSrc} />
        </div>
      </div>
      <div className={"w-full lg:w-1/2 px-4 py-10 lg:py-44 lg:px-32"}>
        <div className={`w-full flex`}>
          <div className={"w-3/4 mb-8"}>
            <Display size={"sm"} tag={"h2"}>
              {title}
            </Display>
          </div>
          <div className={"w-1/4"}>
            <Body size="sm" className={"text-right"}>
              [{index + 1}-{totalRows}]
            </Body>
          </div>
        </div>
        <div className={"mb-8"}>
          {body.map((text, index) => {
            return (
              <Body
                size={"md"}
                key={index}
                className={"mb-3 text-black-subtle"}
              >
                {text}
              </Body>
            );
          })}
        </div>
        {buttons.map((button, index) => {
          return (
            <Link
              key={index}
              href={button.url}
              className={"inline-block mr-3 mb-3"}
            >
              <PrimaryButton
                className={"group"}
                lightMode={button.type === "primary" ? false : true}
                noBorder={button.type === "primary" ? false : true}
              >
                {button.text}
              </PrimaryButton>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MediaRow;
