import { Navbar } from "./components/common";
import { ConnectionProvider } from "hooks/ConnectionContext";
import MainContent from "components/main-content/MainContent";
import { Route, Routes } from "react-router-dom";
import { Paths } from "constants/paths";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <Routes>
          <Route path={Paths.HOME} element={<MainContent />} />
          <Route path={Paths.LEADERBOARD} element={<MainContent />} />
          <Route path={Paths.CONTRACT} element={<MainContent />} />
          <Route path={Paths.ABOUT} element={<MainContent />} />
        </Routes>
      </ConnectionProvider>
    </div>
  );
}

export default App;
