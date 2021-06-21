import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className={classes.title}>
          LGU-TK Job Order DB
        </Typography>

        <Button onClick={handleLogout} variant="contained" disableElevation>
          log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
