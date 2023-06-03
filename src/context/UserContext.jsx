import { createContext, useState, useEffect } from "react";
import userService from "../services/users";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userService
        .getUser()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };

/**
 * How to use this context in a component:
 * import { useContext } from "react";
 * import { UserContext } from "../context/UserContext";
 * const user = useContext(UserContext);
 * ref: https://devtrium.com/posts/how-use-react-context-pro
 */
