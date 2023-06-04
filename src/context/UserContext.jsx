import { createContext, useState, useEffect } from "react";
import userService from "../services/users";
import useToastService from "../hooks/useToastService";

const UserContext = createContext();

/**
 * How to use this context in a component:
 * import { useContext } from "react";
 * import { UserContext } from "../context/UserContext";
 * const { user } = useContext(UserContext);
 * ref: https://devtrium.com/posts/how-use-react-context-pro
 */

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { displayToast } = useToastService();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await userService.getUser();
      setUser(response.user);
    } catch (err) {
      displayToast("error", "Error getting user, please log in again");
      userService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (user) => {
    setUser(user);
  };

  const logOut = () => {
    userService.logout();
    setUser(null);
    displayToast("info", "Logged out successfully");
  };

  const values = {
    user,
    login,
    logOut,
  };

  return (
    <UserContext.Provider value={values}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
