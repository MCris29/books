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
import withAuth from "../hocs/withAuth";
import ProfileDetails from "@/components/ProfileDetails";
import BusinessDetails from "@/components/BusinessDetails";
import {useAuth} from "@/lib/auth";
import Link from "next/link";
import Routes from "@/constants/routes";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  }));

const Profile = () => {
    const { data, error } = useSWR(`/user`, fetcher);
    const {logout, user} = useAuth();
    const classes = useStyles();
    const [showUser, setShowUser] = useState(true);
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

    const handleLogout = async () => {
      logout();
    };

  return (
    <Container className={styles.container}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
            <div className={classes.root}>
              <Avatar className={styles.avatar} alt="Remy Sharp" image={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${data.user.image}`} />
              <h2 className = {styles.text}>{data.user.name}</h2>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={onVisibleUserDetails}
                  className = {styles.MuiListItemText}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                <ListItemText primary="Mi Perfil" />
                </ListItem>
                  <Link href={`${Routes.BOOKS}/users`}>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                <ListItemText primary="Mis Libros" />
                </ListItem>
                  </Link>
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={onVisibleBusinessDetails}
                >
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                <ListItemText primary="Mi Negocio" />
              </ListItem>
            </List>
          <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </List>
        </div>
            </Grid>
            <Grid item xs={9}>
              { showUser ? (
                <ProfileDetails user={data}/>
                ) : showBusiness ? (
                  <BusinessDetails user={data}/>
                ) : "Cargando información"}
            </Grid>
          </Grid> 
    </Container>
  );
};

export default withAuth(Profile)