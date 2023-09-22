import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/authSlice";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  //handle menu drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    console.log("Successfully logged out");
    dispatch(logout());
    localStorage.removeItem("token");
  };

  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, my: 2 }}>
        <LocalDiningIcon />
        Cafe Management System
      </Typography>
      <Divider />
      <ul className="mobile-navigation-menu">
        <li>
          <Link to={"/"}>Dashboard</Link>
        </li>
        {role === "admin" && (
          <li>
            <Link to={"/manageCategory"}>Manage Category</Link>
          </li>
        )}
        {role === "admin" && (
          <li>
            <Link to={"/manageProduct"}>Manage Product</Link>
          </li>
        )}
        <li>
          <Link to={"/manageOrder"}>Manage Order</Link>
        </li>
        <li>
          <Link to={"/viewBill"}>View Bill</Link>
        </li>
        {role === "admin" && (
          <li>
            <Link to={"/manageUsers"}>Manage Users</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>Login / Sign Up</Link>
          </li>
        )}
      </ul>
    </Box>
  );
  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <LocalDiningIcon />
              Cafe Management System
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <Link to={"/"}>Dashboard</Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link to={"/manageCategory"}>Manage Category</Link>
                  </li>
                )}
                {role === "admin" && (
                  <li>
                    <Link to={"/manageProduct"}>Manage Product</Link>
                  </li>
                )}
                <li>
                  <Link to={"/manageOrder"}>Manage Order</Link>
                </li>
                <li>
                  <Link to={"/viewBill"}>View Bill</Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link to={"/manageUsers"}>Manage Users</Link>
                  </li>
                )}
                {isLoggedIn ? (
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <li>
                    <Link to={"/login"}>Login / Sign Up</Link>
                  </li>
                )}
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
