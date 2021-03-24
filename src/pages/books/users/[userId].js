import React from "react";
import styles from "@/styles/Profile.module.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuProfile from "@/components/MenuProfile";
import ShowMyBook from "@/components/ShowMyBook";
import {useRouter} from "next/router";
import withAuth from "@/hocs/withAuth";

const User = () => {
    const router = useRouter()
    const { userId } = router.query
  return (
      <Container className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <MenuProfile/>
          </Grid>
          <Grid item xs={9}>
            <ShowMyBook id={userId}/>
          </Grid>
        </Grid>
      </Container>
  );
};

export default withAuth(User);
