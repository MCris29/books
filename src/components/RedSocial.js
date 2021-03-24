import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 40,
    height: 40,
    color: "#fff",
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        href="http://www.facebook.com"
        onClick={handleClick}
        className={classes.link}
      >
        <FacebookIcon className={classes.icon} />
      </Link>
      <Link
        href="http://www.instagram.com"
        onClick={handleClick}
        className={classes.link}
      >
        <InstagramIcon className={classes.icon} />
      </Link>

      <Link
        href="http://www.instagram.com"
        onClick={handleClick}
        className={classes.link}
      >
        <TwitterIcon className={classes.icon} />
      </Link>
    </Breadcrumbs>
  );
}
