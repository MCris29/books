import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Image from "next/image";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import clsx from "clsx";
import Routes from "../constants/routes";
import IconMenu from "@/components/IconMenu";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";

const drawerWidth = 200;
const mainMenuItems = [
  {
    text: "Inicio",
    to: Routes.HOME,
    icon: "home",
  },
  {
    text: "Libros",
    to: Routes.BOOKS,
    icon: "book",
  },
  {
    text: "Nosotros",
    to: Routes.ABOUT,
    icon: "information",
  },
];
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.quinary.main,
    color: "#fff",
    maxHeight: 180,
  },
  appBarSize: {
    [theme.breakpoints.up("xs")]: {
      height: "87px",
    },
    [theme.breakpoints.up("md")]: {
      height: "auto",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: "none",
    padding: 8,
    maxHeight: 150,
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    "& a img": {
      maxHeight: 45,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  icon: {
    paddingRight: "30px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MainMenu(props) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const renderDrawerMenu = (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={handleDrawerClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainMenuItems.map((item, index) => (
          <Link href={item.to} key={item.text}>
            <ListItem button onClick={() => setOpenDrawer(false)}>
              <Icon className={classes.icon}>{item.icon}</Icon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );

  return (
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Grid container className={classes.appBarSize}>
              <Grid item xs={2} style={{ display: "flex" }}>
                <div className={classes.sectionMobile}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      openDrawer && classes.hide
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Box className={classes.logo}>
                  <Image
                    src="/logo-book_w.png"
                    alt="Book-Hi"
                    width={180}
                    height={66}
                    color="#fff"
                  />
                </Box>
              </Grid>
              <Grid item xs={2} className={classes.drawerHeader}>
                <IconMenu />
              </Grid>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <Grid item xs={12} className={classes.drawerHeader}>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  {mainMenuItems.map((item) => (
                    <Link href={item.to} key={item.text}>
                      <MenuItem>
                        <Icon className={classes.icon}>{item.icon}</Icon>
                        {item.text}
                      </MenuItem>
                    </Link>
                  ))}
                </div>
                <div className={classes.grow} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderDrawerMenu}

      <Toolbar />
    </div>
  );
}
