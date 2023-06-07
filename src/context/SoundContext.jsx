import { createContext, useState } from "react";
import succes from "../assets/win-sound.mp3";
import click from "../assets/click-sound.mp3";
import lose from "../assets/lose-sound.mp3";
import countdown from "../assets/count-sound.mp3";

const SoundContext = createContext();

/**
 * How to use this context in a component:
 * import { useContext } from "react";
 * import { SoundContext } from "../context/SoundContext";
 * const { user } = useContext(SoundContext);
 * ref: https://devtrium.com/posts/how-use-react-context-pro
 */

// eslint-disable-next-line react/prop-types
const SoundContextProvider = ({ children }) => {
  const [sound, setSound] = useState(true);

  const toggleSound = () => {
    setSound(!sound);
  };

  const succesSound = () => {
    const audio = new Audio(succes);
    if (sound) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const clickSound = () => {
    const audio = new Audio(click);
    if (sound) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const loseSound = () => {
    const audio = new Audio(lose);
    if (sound) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const countdownSound = () => {
    const audio = new Audio(countdown);
    audio.loop = false;
    if (sound) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const values = {
    sound,
    toggleSound,
    succesSound,
    clickSound,
    loseSound,
    countdownSound,
  };

  return (
    <SoundContext.Provider value={values}>{children}</SoundContext.Provider>
  );
};

export { SoundContext, SoundContextProvider };
