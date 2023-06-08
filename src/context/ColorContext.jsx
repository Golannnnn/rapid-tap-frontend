import { createContext, useState, useEffect } from "react";
const ColorContext = createContext();

const ColorContextProvider = ({children}) => {
    const [color, setColor] = useState('black');
    const [avatar, setAvatar] = useState(null);
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);

    return (
        <ColorContext.Provider value={{color, setColor, avatar, setAvatar, isAvatarClicked, setIsAvatarClicked}}>
            {children}
        </ColorContext.Provider>
    )
}

export { ColorContext, ColorContextProvider};