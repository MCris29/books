import React from 'react';
import styles from "@/styles/Profile.module.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuProfile from "@/components/MenuProfile";
import ShowMyBooks from "@/components/ShowMyBooks";
import withAuth from "@/hocs/withAuth";
import UpdateMyBook from "@/components/UpdateMyBook";
import {useRouter} from "next/router";

const BookUpdate = () => {
    const router = useRouter()
    const { userId } = router.query
    console.log("n", userId);
    return(
        <Container className={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MenuProfile/>
                </Grid>
                <Grid item xs={9}>
                    <UpdateMyBook id={userId}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withAuth(BookUpdate)