import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./ListItems";
import { Outlet, useNavigate } from "react-router-dom";
import AccountMenu from "../../components/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { logoutRedux } from "../../redux/userSlice/userSlice";




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(true);
  const [subMenuComponent, setSubMenuComponent] = React.useState({comp :null, type : ''});
  const user = useSelector(state=>state.user.user)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const openSubMenu = Boolean(subMenuComponent.comp);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenSubMenu = (e,type)=>{
    setSubMenuComponent({comp :e.target, type})
  }
  
  const handleCloseSubMenu = e => setSubMenuComponent({comp :null})
  const handleLogout = () => {
    dispatch(logoutRedux({navigate}))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }), // this is to hide the open drawer button
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit"  
             >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  aria-controls={openSubMenu ? "notification-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSubMenu ? "true" : undefined}
             
              onClick={(e)=>handleOpenSubMenu(e,'NOTIFICATIONS')} />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              aria-controls={openSubMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSubMenu ? "true" : undefined}
              sx={{ mx: 3 }}
              onClick={(e)=>handleOpenSubMenu(e,'ACCOUNT')}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
           
              > {user?.email.substring(0,1)} </Avatar>
            </IconButton>
          </Toolbar>
          <AccountMenu anchorEl={subMenuComponent.comp} open={openSubMenu} handleClose={handleCloseSubMenu} type={subMenuComponent.type}/>
    
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            
            <Link className="list-link" to='/' >
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon sx={{color : 'red'}} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
      </Link>
          </List>
        </Drawer>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
