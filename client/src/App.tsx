import { ConnectionProvider } from "hooks/ConnectionContext";
import LandingRoute from "app/routes/Landing";
import { Route, Routes } from "react-router-dom";
import { Paths } from "constants/paths";
import LeaderboardRoute from "app/routes/Leaderboard";
import ContractRoute from "app/routes/Contract";
import AboutRoute from "app/routes/About";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Routes>
          <Route path={Paths.HOME} element={<LandingRoute />} />
          <Route path={Paths.LEADERBOARD} element={<LeaderboardRoute />} />
          <Route path={Paths.CONTRACT} element={<ContractRoute />} />
          <Route path={Paths.ABOUT} element={<AboutRoute />} />
        </Routes>
      </ConnectionProvider>
    </div>
  );
}

export default App;
