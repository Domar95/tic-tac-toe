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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GamesIcon from "@mui/icons-material/Games";
import ConnectButton from "./ConnectButton";

const pages = ["Leaderboard", "Contract", "About"];

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
      sx={{ backgroundColor: "inherit", color: "inherit" }}
    >
      <Toolbar disableGutters>
        <IconButton size="large" edge="start" color="inherit">
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
          {pages.map((page) => (
            <Button key={page} sx={{ textTransform: "none", color: "inherit" }}>
              {page}
            </Button>
          ))}
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
                <MenuItem key={page} color="inherit">
                  {page}
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
