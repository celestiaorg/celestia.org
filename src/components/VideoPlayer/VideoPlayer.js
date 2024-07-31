"use client";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";

const VideoPlayer = ({ src = "", autoPlay = true }) => {
  return (
    <div className={`h-full w-full absolute block top-0 left-0`}>
      <ReactPlayer
        playsinline
        muted
        controls={false}
        loop
        playing={autoPlay}
        url={src}
        width={"100%"}
        height={"100%"}
        className={"video-player"}
      />
    </div>
  );
};

export default VideoPlayer;
