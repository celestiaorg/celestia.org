"use client";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";

const VideoPlayer = ({ src }) => {
  return (
    <div className={`h-full w-full absolute block`}>
      <ReactPlayer
        playsinline
        muted
        controls={false}
        loop
        playing
        url={src}
        width={"100%"}
        height={"100%"}
        className={"video-player"}
      />
    </div>
  );
};

export default VideoPlayer;
