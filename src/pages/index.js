import React from "react";
import Slider from "@/components/Slider";
import CardInf from "@/components/CardInf";
import Categories from "@/components/Categories";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardView from "@/components/Cardview";
//import SingleLine from "@/components/SingleLine";

export default function Home() {
  return (
    <div>
      <Slider />
      <CardInf />
      <Categories />
      <CardView />

      <Container maxWidth="lg">
        {/*<Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Component {...pageProps} />
                  </Grid>
                </Grid>*/}
      </Container>
    </div>
  );
}
