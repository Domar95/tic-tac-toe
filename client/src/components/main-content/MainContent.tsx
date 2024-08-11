import { Box, Container } from "@mui/material";
import { useConnection } from "hooks/ConnectionContext";
import Game from "./tic-tac-toe-game/Game";
import Hero from "./hero/Hero";
import HeroExtension from "./hero/HeroExtension";
import checker from "assets/checker.png";

export default function MainContent() {
  const { isConnected } = useConnection();

  return (
    <div>
      {isConnected ? (
        <Box>
          <Container maxWidth="sm">
            <Game />
          </Container>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${checker})`,
              backgroundSize: "auto",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth="sm">
              <Hero />
            </Container>
          </Box>
          <Container maxWidth="lg">
            <HeroExtension />
          </Container>
        </>
      )}
    </div>
  );
}
