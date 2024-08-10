import { Container } from "@mui/material";
import { Navbar } from "./components/common";
import Game from "./components/tic-tac-toe-game/Game";

function App() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Game />
      </Container>
    </div>
  );
}

export default App;
