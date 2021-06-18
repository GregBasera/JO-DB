import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          LGU-TK JO-DB
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
