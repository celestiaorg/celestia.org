"use client";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";

const VideoPlayer = ({ src }) => {
  return (
    <div className={`h-full w-full relative block`}>
      <ReactPlayer
        playsinline
        muted
        controls={false}
        loop
        playing
        url={src}
        width={"auto"}
        height={"auto"}
        className={"video-player"}
      />
    </div>
  );
};

export default VideoPlayer;
