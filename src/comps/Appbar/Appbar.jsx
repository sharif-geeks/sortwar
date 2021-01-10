import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MinimizeIcon from "@material-ui/icons/Minimize";
import Crop54Icon from "@material-ui/icons/Crop54";

const { remote } = window.electron;
var win = remote.BrowserWindow.getFocusedWindow();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    "-webkit-app-region": "no-drag",
    color: "#dddd",
    "&:hover": {
      color: "#dddf",
    },
  },
  title: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Sort War
          </Typography>
          <Space />
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => win.minimize()}
          >
            <MinimizeIcon />
          </IconButton>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => win.setFullScreen(!win.isFullScreen())}
          >
            <Crop54Icon />
          </IconButton>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => win.close()}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Space = styled.div`
  flex: 1;
`;
