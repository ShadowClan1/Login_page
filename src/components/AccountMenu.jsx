import React from "react";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";

const AccountMenu = ({
  anchorEl,
  open,
  upperList = [],
  lowerList = [
    {
      icon: <Settings fontSize="small" />,
      onClick: () => {},
      label: "settings",
    },
    {
      icon: <Logout fontSize="small" />,
      onClick: () => { },
      label: "Logout",
    },
  ],
  handleClose,
  type
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
    

      {/* {upperList.map((e) => {
        return (
          
            <MenuItem onClick={e.onClick}>
              <ListItemIcon>{e.icon}</ListItemIcon>
              {e.label}
            </MenuItem>
          
        );
      })} */}

       <MenuItem onClick={handleClose}>
        <Avatar /> Profile
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar /> My account
      </MenuItem>
      <Divider />
      {lowerList.map((e) => {
        return (
          <MenuItem onClick={e.onClick} key={e.label}>
            <ListItemIcon>{e.icon}</ListItemIcon>
            {e.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default AccountMenu;
