import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PagesIcon from "@mui/icons-material/Pages";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Sidebar = () => {

  return (
    <Box position="fixed" width="14vw" mr="0px">
      <List sx={{ cursor: "pointer" }}>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PagesIcon />
          </ListItemIcon>
          <ListItemText primary="Pages" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="MarketPlace" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
