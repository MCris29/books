import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: "#414A4F",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    borderRadius: "10px",
    height: "300px",
  },

  avatar: {
    backgroundColor: "#FC0404",
    color: "#FFFFFF",
  },

  actions: {
    flexGrow: 2,
  },
  cardavatar: {
    position: "relative",
    top: "-115%",
    zIndex: "modal",
  },
  cardContent: {
    color: "#fff",
  },
  title: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
  title1: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
}));

const cardView = () => {
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
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container
          className={classes.cardGrid}
          style={{ padding: "20px" }}
          maxWidth="md"
        >
          <div>
            <Typography
              component="h6"
              variant="h4"
              style={{ color: "#003D59" }}
            >
              Novedades
            </Typography>
          </div>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          {data.data.map((data) => (
            <Grid
              container
              spacing={5}
              direction="col"
              justify="center"
              alignItems="center"
            >
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                {data.new != 0 && (
                  <Card className={classes.card}>
                    <CardMedia
                      style={{ position: "relative" }}
                      className={classes.cardMedia}
                      image={`https://picsum.photos/200/300?sig=${data.id}`}
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
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h5"
                        style={{ color: "#F8BF0C" }}
                        className={classes.title1}
                      >
                        {data.category}
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
                        <Link href={`${Routes.BOOKS}/${data.id}`} passHref>
                          Detalles
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </Grid>
            </Grid>
          ))}
          ;
        </Container>
      </main>
    </React.Fragment>
  );
};
export default cardView;
