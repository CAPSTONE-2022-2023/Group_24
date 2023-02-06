import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const clientPages = ['', 'Homepage/Customer', 'Room/List'];
const clientPagesName = ['Logout', 'Homepage', 'View Room Selections'];

const employeePages = ['', 'Homepage/Employee', 'Room/View'];
const employeePagesName = ['Logout', 'Homepage', 'Room Management'];

const pages = [];
const pagesName = [];

clientPages.map(page => pages.push(page));
employeePages.map(page => pages.push(page));

clientPagesName.map(pageName => pagesName.push(pageName));
employeePagesName.map(pageName => pagesName.push(pageName));

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Seneca Hotel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              disabled={localStorage.getItem("username") === null || localStorage.getItem("username") === "" || localStorage.length === 0 ? true : false}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {clientPages.slice(localStorage.getItem("username") === null || localStorage.getItem("username") === "" || localStorage.length === 0 ? clientPages.length : (localStorage.getItem("accountType") === "0" ? 0 : clientPages.length)).map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link onClick={page == 0 && handleClick} style={{ textDecoration: "none", color: "white" }}
                      to={`/${page}`}>{clientPagesName[localStorage.getItem("username") === null || localStorage.getItem("username") === "" ? index + 1 : index]}</Link>
                  </Typography>
                </MenuItem>
              ))}
              {employeePages.slice(localStorage.getItem("username") === null || localStorage.getItem("username") === "" || localStorage.length === 0 ? employeePages.length : (localStorage.getItem("accountType") === "1" ? 0 : employeePages.length)).map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link onClick={page == 0 && handleClick} style={{ textDecoration: "none", color: "white" }}
                      to={`/${page}`}>{employeePagesName[localStorage.getItem("username") === null || localStorage.getItem("username") === "" ? index + 1 : index]}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Seneca Hotel
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {clientPages.slice(localStorage.getItem("username") === null || localStorage.getItem("username") === "" || localStorage.length === 0 ? clientPages.length : (localStorage.getItem("accountType") === "0" ? 0 : clientPages.length)).map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link onClick={page == 0 && handleClick} style={{ textDecoration: "none", color: "white" }}
                  to={`/${page}`}>{clientPagesName[localStorage.getItem("username") === null || localStorage.getItem("username") === "" ? index + 1 : index]}</Link>
              </Button>
            ))}

            {employeePages.slice(localStorage.getItem("username") === null || localStorage.getItem("username") === "" || localStorage.length === 0 ? employeePages.length : (localStorage.getItem("accountType") === "1" ? 0 : employeePages.length)).map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link onClick={page == 0 && handleClick} style={{ textDecoration: "none", color: "white" }}
                  to={`/${page}`}>{employeePagesName[localStorage.getItem("username") === null || localStorage.getItem("username") === "" ? index + 1 : index]}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;