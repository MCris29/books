import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const tileData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    //overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const singleLine = () => {
  const classes = useStyles();
  const router = useRouter();

  const { data, error } = useSWR(`/books`, fetcher);

  if (error) return <div>No se pudo cargar el contenido</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {tileData.map((tile) => (
          <GridListTile key={tile}>
            {data.data.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                {data.new != 0 && (
                  <Card className={classes.card}>
                    <CardMedia
                      style={{ position: "relative" }}
                      className={classes.cardMedia}
                      image={
                        "https://source.unsplash.com/random?sig=${data.id}"
                      }
                      title={data.title}
                    >
                      {data.new == 1 && (
                        <CardHeader
                          style={{ color: "#FC0404" }}
                          className={classes.cardavatar}
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              className={classes.avatar}
                            >
                              N
                            </Avatar>
                          }
                          title="Nuevo"
                        />
                      )}
                    </CardMedia>

                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h5"
                        className={classes.title1}
                      >
                        {data.author}
                      </Typography>

                      <Typography>$ Precio {data.price} USD </Typography>
                    </CardContent>
                    <CardActions md={12} dir="rtl">
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          color: "#003D59",
                          backgroundColor: "#F8BF0C",
                          float: "right",
                        }}
                      >
                        Contactar
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        style={{ float: "right" }}
                      >
                        <Link href={"${Routes.BOOKS}/${data.id}"}>
                          Detalles
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </Grid>
            ))}
            ;
            <GridListTileBar
              classes={{
                root: classes.titleBar,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
export default singleLine;
