import { Navbar } from "./components/common";
import { ConnectionProvider } from "hooks/ConnectionContext";
import LandingRoute from "app/routes/Landing";
import { Route, Routes } from "react-router-dom";
import { Paths } from "constants/paths";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <Routes>
          <Route path={Paths.HOME} element={<LandingRoute />} />
          <Route path={Paths.LEADERBOARD} element={<LandingRoute />} />
          <Route path={Paths.CONTRACT} element={<LandingRoute />} />
          <Route path={Paths.ABOUT} element={<LandingRoute />} />
        </Routes>
      </ConnectionProvider>
    </div>
  );
}

export default App;
