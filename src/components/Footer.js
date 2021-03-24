import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Routes from "../constants/routes";
import { Link as MuiLink } from "@material-ui/core";
import Image from "next/image";
import RedSocial from "@/components/RedSocial";
import Menufooter from "@/components/Menufooter";
import Divider from "@material-ui/core/Divider";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "} Book-Hi | 2020 Creado por JCCL
      <Link href="https://material-ui.com/"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6, 0),
    backgroundColor: "#003D59",
    color: "#fff",
  },
  root: {
    flexGrow: 1,
    display: "flex",
    alignContent: "center",
    padding: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    alignItems: "center",
    alignContent: "right",
    color: theme.palette.text.secondary,
    background: "#fff",
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid
            container
            direction="col"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Box className={classes.logo}>
                <Link href={Routes.HOME} passHref>
                  <MuiLink>
                    <Image src="/logo-book_w.png" width={200} height={60} />
                  </MuiLink>
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            direction="col"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Box className={classes.logo}>
                <Menufooter />
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            direction="col"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Box className={classes.logo}>
                <RedSocial />
              </Box>
            </Grid>
          </Grid>
        </div>
        <Divider style={{ background: "#fff" }} />
      </Container>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Copyright />
        </Container>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
