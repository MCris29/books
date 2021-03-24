import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
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

  avatar1: {
    backgroundColor: "#FE6625",
    color: "#FFFFFF",
  },
  avatar2: {
    backgroundColor: "#167070",
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

const category = () => {
  const router = useRouter();
  const classes = useStyles();
  const { categoryId } = router.query;
  const { data, error } = useSWR(`/books/categories/${categoryId}`, fetcher);

  if (error) return <div>No se pudo cargar la información libro</div>;
  if (!data) return <Loading />;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div style={{ textAlign: "center" }}>
          <Typography
            component="h6"
            variant="h4"
            style={{
              color: "#003D59",
            }}
          >
            Resultados encontrados
          </Typography>
        </div>
        <div style={{ padding: "20px" }}></div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography
            component="h6"
            variant="h4"
            style={{ color: "#003D59" }}
          ></Typography>
          <Grid container spacing={5}>
            {data.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    style={{ position: "relative" }}
                    className={classes.cardMedia}
                    image={`https://picsum.photos/200/300?sig=${data.id}`}
                    title={data.title}
                  >
                    {data.available == 1 ? (
                      <CardHeader
                        style={{ color: "#FE6625" }}
                        className={classes.cardavatar}
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar1}
                          >
                            D
                          </Avatar>
                        }
                        title="Disponible"
                      />
                    ) : (
                      <CardHeader
                        style={{ color: "#167070" }}
                        className={classes.cardavatar}
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar2}
                          >
                            A
                          </Avatar>
                        }
                        title="Agotado"
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

                    <Typography>Precio $ {data.price} USD </Typography>
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
                      <Link href={`${Routes.BOOKS}/${data.id}`}>Detalles</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            ;
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default category;
