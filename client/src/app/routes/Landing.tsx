import { Box, Container } from "@mui/material";
import { useConnection } from "hooks/ConnectionContext";
import Game from "../../components/main-content/tic-tac-toe-game/Game";
import Hero from "../../components/main-content/hero/Hero";
import HeroExtension from "../../components/main-content/hero/HeroExtension";
import checker from "assets/checker.png";
import { Layout } from "components/layouts/Layout";

export default function LandingRoute() {
  const { isConnected } = useConnection();

  return (
    <Layout>
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
    </Layout>
  );
}
