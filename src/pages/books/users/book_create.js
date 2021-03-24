import React from "react";
import styles from "@/styles/Profile.module.css";
import Grid from "@material-ui/core/Grid";
import MenuProfile from "@/components/MenuProfile";
import Container from "@material-ui/core/Container";
import withAuth from "@/hocs/withAuth";
import CreateMyBook from "@/components/CreateMyBook";

const BookCreate = () =>{
    return(
        <Container className={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MenuProfile/>
                </Grid>
                <Grid item xs={9}>
                    <CreateMyBook/>
                </Grid>
            </Grid>
        </Container>
    );
}
export default withAuth(BookCreate);