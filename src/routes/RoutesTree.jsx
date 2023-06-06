import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import TapMode from "../game/TapMode";
import HighScorePage from "../pages/HighScorePage";
import UserRoute from "./UserRoute";
import GuestRoute from "./GuestRoute";
import Settings from "../pages/Settings";
import ClickMode from "../game/ClickMode";

// Routes that are for users need to be wrapped in UserRoute

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route
        path="/clickmode"
        element={
          <UserRoute>
            <ClickMode />
          </UserRoute>
        }
      />
      <Route
        path="/tapmode"
        element={
          <UserRoute>
            <TapMode />
          </UserRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/highscores"
        element={
          <UserRoute>
            <HighScorePage />
          </UserRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <UserRoute>
            <Settings />
          </UserRoute>
        }
      />
    </Routes>
  );
};

export default RoutesTree;
