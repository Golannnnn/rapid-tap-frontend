import RoutesTree from "./routes/RoutesTree";
import { UserContextProvider } from "./context/UserContext";
import { SoundContextProvider } from "./context/SoundContext";
import Navbar from "./components/Navbar";
import { ColorContextProvider } from "./context/ColorContext";

function App() {
  return (
    <div className="body">
      <UserContextProvider>
        <SoundContextProvider>
          <ColorContextProvider>
            <Navbar />
            <RoutesTree />
          </ColorContextProvider>
        </SoundContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
