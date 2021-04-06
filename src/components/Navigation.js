import {useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
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
import SearchBar from "@/components/SearchBar";

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
}));

function HideOnScroll(props) {
    const {children} = props;
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
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
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
                            <Grid item xs={2} style={{display: "flex"}}>
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
                                        <MenuIcon/>
                                    </IconButton>
                                </div>
                                <div className={classes.sectionDesktop}>
                                    <SearchBar/>
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                style={{display: "flex", justifyContent: "center"}}
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
                                <IconMenu/>
                            </Grid>

                            <Grid item xs={12} className={classes.drawerHeader}>
                                <div className={classes.grow}/>
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
                                <div className={classes.grow}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {renderDrawerMenu}

            <Toolbar/>
        </div>
    );
}
