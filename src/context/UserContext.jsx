import { createContext, useState, useEffect } from "react";
import userService from "../services/users";

const UserContext = createContext();

/**
 * How to use this context in a component:
 * import { useContext } from "react";
 * import { UserContext } from "../context/UserContext";
 * const user = useContext(UserContext);
 * ref: https://devtrium.com/posts/how-use-react-context-pro
 */

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userService
        .getUser()
        .then((data) => setUser(data.user))
        .catch((err) => console.log(err));
    }
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logOut = () => {
    userService.logout();
    setUser(null);
  };

  const values = {
    user,
    login,
    logOut,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
