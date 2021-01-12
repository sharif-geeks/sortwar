import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "react-icons/vsc";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscGithubAlt,
} from "react-icons/vsc";
import styled from "styled-components";

const { remote } = window.electron;
var win = remote.BrowserWindow.getFocusedWindow();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  appbar: {},
  toolbar: {
    alignItems: "center",
    padding: "0 4px",
  },
  menuButton: {
    "-webkit-app-region": "no-drag",
    color: "#dddd",
    display: "flex",
    margin: "0 2px",
    "&:hover": {
      color: "#dddf",
    },
  },
  title: {
    margin: 0,
    marginLeft: theme.spacing(2),
  },
}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() =>
              window.electron.shell.openExternal(
                "https://github.com/sharif-geeks/sortwar"
              )
            }
          >
            <VscGithubAlt />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.title}
          >
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
            <VscChromeMinimize size={18} />
          </IconButton>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => win.setFullScreen(!win.isFullScreen())}
          >
            <VscChromeMaximize size={18} />
          </IconButton>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => win.close()}
          >
            <VscChromeClose size={18} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Space = styled.div`
  flex: 1;
`;
