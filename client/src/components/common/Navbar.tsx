import { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuList,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GamesIcon from "@mui/icons-material/Games";
import ConnectButton from "./ConnectButton";
import { Paths } from "constants/paths";
import { Link } from "react-router-dom";

const pages: { title: string; path: Paths }[] = [
  { title: "Leaderboard", path: Paths.LEADERBOARD },
  { title: "Contract", path: Paths.CONTRACT },
  { title: "About", path: Paths.ABOUT },
];

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#FAFAFA", color: "inherit" }}
    >
      <Toolbar disableGutters sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          component={Link}
          to={Paths.HOME}
        >
          <GamesIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "inherit" }}
        >
          Tic Tac Toe
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack direction="row" paddingRight={2}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{
                  textTransform: "none",
                  color: "inherit",
                  backgroundColor: "#FAFAFA",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
                component={Link}
                to={page.path}
              >
                {page.title}
              </Button>
            ))}
          </Stack>
          <ConnectButton />
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}>
          <IconButton size="large" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorNav}
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
          >
            <MenuList>
              <MenuItem>
                <ConnectButton />
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  color="inherit"
                  component={Link}
                  to={page.path}
                >
                  {page.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
