import React, { useState, useRef } from "react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi";
import click from "../assets/click.mp3";
import success from "../assets/success.mp3";
import fail from "../assets/fail.mp3";

const Sounds = () => {
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

  const playClickSound = () => {
    if (isPlaying) {
      const audio = new Audio(click);
      audio.play();
    }
  };

  const playSuccessSound = () => {
    if (isPlaying) {
      const audio = new Audio(success);
      audio.play();
    }
  };

  const playFailSound = () => {
    if (isPlaying) {
      const audio = new Audio(fail);
      audio.play();
    }
  };

  return (
    <div>
      {isPlaying && <audio ref={audioRef} src={click} volume={0.5}></audio>}
      <HiOutlineSpeakerWave
        onClick={() => {
          playMusic();
          playClickSound();
        }}
        size="30px"
        color="black"
        cursor="pointer"
      />
      <button onClick={playSuccessSound}>Play Success Sound</button>
      <button onClick={playFailSound}>Play Fail Sound</button>
    </div>
  );
};

export default Sounds;
