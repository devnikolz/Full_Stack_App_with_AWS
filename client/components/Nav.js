import Link from "next/link";
import { useState, useEffect } from "react";
import { isAuth, logout } from "../helpers/auth";
import Router from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    if (url) {
      Router.push(url);
    }
    setAnchorEl(null);
  };

  const [loading, setLoading] = useState(false);

  const end = () => {
    setLoading(false);
  };

  useEffect(() => {
    const start = () => setLoading(false);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/static/css/styles.css" />
      </Head>
      {loading && (
        <LinearProgress style={{ backgroundColor: "red", height: 10 }} />
      )}
      <AppBar
        position="static"
        style={{ backgroundColor: "black", boxShadow: "0px 0px 10px white" }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link href="/">
              <a style={{ textDecoration: "none", color: "white" }}>
                Young Developer Hub
              </a>
            </Link>
          </Typography>
          <Button
            color="inherit"
            startIcon={<MenuIcon />}
            onClick={handleClick}
          >
            {isAuth() && (
              <Avatar alt={isAuth().name} src="/static/images/avatar.jpg" />
            )}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            {(!isAuth() && [
              <MenuItem key="login" onClick={() => handleClose("/login")}>
                <a className="nav-link text-dark">Login</a>
              </MenuItem>,
              <MenuItem key="register" onClick={() => handleClose("/register")}>
                <a className="nav-link text-dark">Register</a>
              </MenuItem>,
            ]) ||
              null}
            {(isAuth() &&
              isAuth().role === "admin" && [
                <MenuItem key="admin" onClick={() => handleClose("/admin")}>
                  <a className="nav-link text-dark">{isAuth().name}</a>
                </MenuItem>,
                <MenuItem key="trends" onClick={() => handleClose("/trends")}>
                <a className="nav-link text-dark">Trending</a>
              </MenuItem>,
                <MenuItem
                  key="link-create"
                  onClick={() => handleClose("/user/link/create")}
                >
                  <a className="nav-link text-dark">Submit a link</a>
                </MenuItem>,
                <MenuItem key="code" onClick={() => handleClose("/code")}>
                  <a className="nav-link text-dark">Code Editor</a>
                </MenuItem>,
                   <MenuItem key="discuss" onClick={() => handleClose("/discuss")}>
                   <a className="nav-link text-dark">Q&A</a>
                 </MenuItem>,
              ]) ||
              null}
            {(isAuth() &&
              isAuth().role === "subscriber" && [
                <MenuItem key="user" onClick={() => handleClose("/user")}>
                  <a className="nav-link text-dark">{isAuth().name}</a>
                </MenuItem>,
                <MenuItem key="trends" onClick={() => handleClose("/trends")}>
                <a className="nav-link text-dark">Trending</a>
              </MenuItem>,
                <MenuItem
                  key="link-create"
                  onClick={() => handleClose("/user/link/create")}
                >
                  <a className="nav-link text-dark">Submit a link</a>
                </MenuItem>,
                <MenuItem key="code" onClick={() => handleClose("/code")}>
                  <a className="nav-link text-dark">Code Editor</a>
                </MenuItem>,
                 <MenuItem key="discuss" onClick={() => handleClose("/discuss")}>
                 <a className="nav-link text-dark">Q&A</a>
               </MenuItem>,
                <MenuItem
                key="request"
                onClick={() => handleClose("/requests")}
              >
                <a className="nav-link text-dark">Request a topic</a>
              </MenuItem>,
              ]) ||
              null}
            {(isAuth() && [
              <MenuItem
                key="logout"
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                <a className="nav-link text-dark">Logout</a>
              </MenuItem>,
            ]) ||
              null}
          </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Nav;
