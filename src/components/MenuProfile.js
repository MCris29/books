import React, {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import styles from "@/styles/Profile.module.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import useSWR from 'swr';
import Routes from "@/constants/routes";
import Link from "next/link";
import {useAuth} from "@/lib/auth";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
}));

const MenuProfile = () => {
    const { data, error } = useSWR(`/user`, fetcher);
    const classes = useStyles();
    const {logout, user} = useAuth();
    const [showUser, setShowUser] = useState(true);
    const handleLogout = async () => {
        logout();
    };
    const [showBusiness, setShowBusiness] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    if (error) return <div>No se pudo cargar la información del usuario</div>;
    if (!data) return <Loading />;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const onVisibleUserDetails = () => {
        setShowUser(true);
        setShowBusiness(false);
    };

    const onVisibleBusinessDetails = () => {
        setShowUser(false);
        setShowBusiness(true);
    };

    if (error) return <div>No se pudo cargar la información del usuario</div>;
    if (!data) return <Loading />;
    return (
        <div className={classes.root}>
            <Avatar className={styles.avatar} alt="Remy Sharp" src="https://static.thenounproject.com/png/363640-200.png" />
            <h2 className = {styles.MuiListItemText}>{data.user.name}</h2>
            <List component="nav" aria-label="main mailbox folders">
                <Link href={Routes.PROFILE}>
                <ListItem button className = {styles.MuiListItemText}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mi Perfil" />
                </ListItem>
                </Link>
                <Link href={`${Routes.BOOKS}/users`}>
                <ListItem button>
                    <ListItemIcon>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mis Libros" />
                </ListItem>
                </Link>
                <Link href={Routes.PROFILE}>
                <ListItem button>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mi Negocio" />
                </ListItem>
                </Link>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
                <Link href={Routes.BOOKS}>
                <ListItem
                    button
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar Sesión" />
                </ListItem>
                </Link>
            </List>
        </div>
    );
};

export default MenuProfile;