import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountBox, Explore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = [
    {
      menu: "Profile",
      icon: <AccountBox />,
      action: () => {
        navigate("/account");
        handleDrawerToggle();
      },
    },
    {
      menu: "Account",
      icon: <AccountBox />,
      action: () => alert("Go to Account"),
    },
    {
      menu: "Dashboard",
      icon: <AccountBox />,
      action: () => alert("Go to Dashboard"),
    },
    {
      menu: "Settings",
      icon: <AccountBox />,
      action: () => {
        navigate("/settings");
        handleDrawerToggle();
      },
    },
    {
      menu: "Logout",
      icon: <AccountBox />,
      action: () => alert("Logging out..."),
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = (action) => {
    action();
    handleDrawerToggle(); // Close the drawer on mobile after selection
    handleCloseUserMenu(); // Close the menu
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", background: "#191919", height: "100%" }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          my: 2,
          justifyContent: "center",
        }}
      >
        <Explore sx={{ color: "#87E64B", mr: 1 }} />
        <Typography sx={{ color: "#fff" }}>
          trekTrove<span style={{ color: "#87E64B" }}>.</span>
        </Typography>
      </Box>
      <Divider />
      <List>
        {settings.map(({ menu, icon, action }) => (
          <ListItem key={menu} disablePadding>
            <ListItemIcon sx={{ justifyContent: "center", color: "#fff" }}>
              {icon}
            </ListItemIcon>
            <ListItemButton onClick={() => handleMenuItemClick(action)}>
              <ListItemText sx={{ color: "#fff" }} primary={menu} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "left" },
            }}
          >
            <Explore sx={{ color: "#87E64B", mr: 1 }} />
            <Typography>
              trekTrove<span style={{ color: "#87E64B" }}>.</span>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Tooltip title="Open settings">
              <IconButton
                sx={{ p: 0 }}
                onClick={handleOpenUserMenu}
                aria-label="user settings"
              >
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
              {settings.map(({ menu, action }) => (
                <MenuItem
                  key={menu}
                  onClick={() => handleMenuItemClick(action)}
                >
                  <Typography sx={{ textAlign: "center" }}>{menu}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton sx={{ p: 0 }} aria-label="user settings">
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
