/* eslint-disable react/prop-types */
import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

export default function SideBar(props) {
  const { modules } = props;
  const [open, setOpen] = React.useState({}); // Track open state for each menu

  const handleClick = (menu) => {
    setOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
      component="nav"
    >
      {modules.map((menu, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(menu.menu)}>
            <ListItemIcon>{menu.menuIcon}</ListItemIcon>
            <ListItemText primary={menu.menu} />
            {open[menu.menu] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[menu.menu]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Sub-menu Item" />
              </ListItemButton>
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}
