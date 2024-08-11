import { Box, Card, CardContent, Icon, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function HeroExtension() {
  const theme = useTheme();

  const cards: { title: string; description: string }[] = [
    { title: "Play online", description: "Play with anyone, anytime." },
    {
      title: "Compete",
      description: "Compete to secure your spot in the leaderboard.",
    },
    { title: "Earn", description: "Play for ETH, win the pot." },
  ];

  return (
    <Stack height="318px" justifyContent="center" spacing={4}>
      <Box>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Tic Tac Toe
        </Typography>
        <Typography>powered by Ethereum Blockchain</Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between">
        {cards.map((card) => (
          <Card
            sx={{
              display: "flex",
              backgroundColor: theme.palette.background.default,
              boxShadow: "none",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ paddingTop: 0.5 }}>
                <InfoOutlinedIcon></InfoOutlinedIcon>
              </Box>
              <CardContent sx={{ paddingTop: 0 }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {card.title}
                </Typography>
                <Typography> {card.description}</Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
