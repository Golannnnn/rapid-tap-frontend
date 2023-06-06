import React, { useState, useRef } from "react";
import audiomusic from "../assets/backgroundmusic.mp3";
import { Button } from "@chakra-ui/react";
import { TbMusic, TbMusicOff } from "react-icons/tb";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={audiomusic} loop volume={0.5}></audio>
      {isPlaying ? (
        <TbMusic
          onClick={playMusic}
          size="30px"
          color="black"
          cursor="pointer"
        />
      ) : (
        <TbMusicOff
          onClick={playMusic}
          size="30px"
          color="black"
          cursor="pointer"
        />
      )}
    </div>
  );
};

export default BackgroundMusic;
