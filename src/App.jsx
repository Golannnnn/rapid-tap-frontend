import RoutesTree from "./routes/RoutesTree";
import { UserContextProvider } from "./context/UserContext";
import { SoundContextProvider } from "./context/SoundContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="body">
      <UserContextProvider>
        <SoundContextProvider>
          <Navbar />
          <RoutesTree />
        </SoundContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
