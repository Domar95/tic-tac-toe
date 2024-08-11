import { Box, Stack, Typography } from "@mui/material";
import ConnectButton from "components/common/ConnectButton";

const HeroSection = () => {
  return (
    <Box
      sx={{
        padding: 2,
        height: 562,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Stack spacing={1}>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Tic Tac Toe
          </Typography>
          <Typography variant="h4">
            Outplay, Outscore and Outearn <br /> Your Path to the Top Starts
            Here!
          </Typography>
        </Stack>
        <ConnectButton />
      </Stack>
    </Box>
  );
};

export default HeroSection;
