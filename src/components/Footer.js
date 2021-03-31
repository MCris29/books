import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Routes from "@/constants/routes";
import Image from "next/image";
import Divider from '@material-ui/core/Divider';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6, 0),
        backgroundColor: "#003D59",
        color: "#fff",
        textAlign: "center",
    },
    root: {
        flexGrow: 1,
        display: "flex",
        alignContent: "center",
        padding: "20px",
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
    links: {
        padding: "0 20px",
        color: "#fff",
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {"Copyright © Book-Hi | Created by JCCL "}
            <Link href={Routes.HOME}/>
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}


const mainMenuItems = [
    {
        text: "Inicio",
        to: Routes.HOME,
    },
    {
        text: "Libros",
        to: Routes.BOOKS,
    },
    {
        text: "Nosotros",
        to: Routes.ABOUT,
    },
];

const socialNets = [
    {
        icon: <FacebookIcon/>,
        to: "https://facebook.com",
    },
    {
        icon: <InstagramIcon/>,
        to: "https://instagram.com",
    },
    {
        icon: <TwitterIcon/>,
        to: "https://twitter.com",
    },
];


export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Grid container>
                <Grid item xs={12} lg={4}>
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
                <Grid item xs={12} lg={4}>
                    {
                        mainMenuItems.map((item, index) => (
                            <Link
                                href={item.to} key={item.text}
                                className={classes.links}
                            >
                                {item.text}
                            </Link>
                        ))}
                </Grid>
                <Grid item xs={12} lg={4}>
                    {
                        socialNets.map((item, index) => (
                            <Link
                                href={item.to} key={item.text}
                                className={classes.links}
                            >
                                {item.icon}
                            </Link>
                        ))
                    }
                </Grid>
                <Divider light/>
                <Grid item xs={12}>
                    <Copyright/>
                </Grid>
            </Grid>
        </div>
    );
}