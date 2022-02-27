import { NavLink, Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Container from "@mui/material/Container";
import logo from "../../assets/psi.png";
import Avatar from "@mui/material/Avatar";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  ["Home", "/"],
  ["Nuevo Invoice", "crear-comprobante"],
  ["Consultar", "consulta"],
  ["Counter", "counter"],
];

const ResponsiveAppBar = () => {
  let navigate = useNavigate();

  function logOut() {
    signOut(auth);
    navigate("/");
    handleCloseNavMenu();
  }

  function logIn() {
    navigate("signIn");
    handleCloseNavMenu();
  }

  const settings = [
    { nombre: "SignIn", function: logIn },
    { nombre: "Logout", function: logOut },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {
            //  estilos para pantalla grande con xs: none se esconde para pantallas pequeñas
          }
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <NavLink to={"/"}>
              <img src={logo} alt="logo" className={classes.logo} />
            </NavLink>
          </Box>

          {
            //  estilos para pequeña
          }

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <NavLink
                  to={page[1]}
                  className={({ isActive }) => {
                    return !isActive ? classes.inactive : classes.active;
                  }}
                  // style={(isActive) => ({
                  //   color: isActive ? "green" : "blue",
                  // })}
                >
                  <MenuItem
                    key={page[1]}
                    onClick={handleCloseNavMenu}
                    className={classes.menu}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {page[0]}
                    </Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>

          {
            //* todo lo del menu para pantallas grandes
          }

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <NavLink to={"/"}>
              <img src={logo} alt="logo" className={classes.logo} />
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                to={page[1]}
                className={({ isActive }) => {
                  return !isActive ? classes.inactive : classes.active;
                }}
              >
                {" "}
                <MenuItem
                  key={page[1]}
                  onClick={handleCloseNavMenu}
                  className={classes.menu}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      display: "block",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {page[0]}
                  </Typography>
                </MenuItem>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "#616161" }}>
                  <SettingsIcon />
                </Avatar>
                {
                  // <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.nombre} onClick={setting.function}>
                  <Typography
                    textAlign="center"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {setting.nombre}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

// const MainNavigation = () => {
//   return (
//     <header className={classes.header}>
//       <div className={classes.logo}>Great Quotes</div>
//       <nav className={classes.nav}>
//         <ul>
//           <li>
//             <NavLink
//               to="/quotes"
//               className={(isActive) => (isActive ? classes.active : "")}
//             >
//               All Quotes
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/new-quote"
//               className={(isActive) => (isActive ? classes.active : "")}
//             >
//               Add a Quote
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };
