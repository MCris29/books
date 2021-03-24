import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Backdrop } from "@material-ui/core";
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

  cardGrid: {
    /*paddingTop: theme.spacing(2),*/
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: "#cfd3d6",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    borderRadius: "10px",
    height: "100%",
  },

  avatar: {
    backgroundColor: "#FE6625",
    color: "#FFFFFF",
  },
  actions: {
    flexGrow: 2,
  },
  cardavatar: {
    position: "relative",

    zIndex: "modal",
  },
}));

const ComCategories = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data, error } = useSWR(`/categories`, fetcher);
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
              Categorias
            </Typography>
          </div>
        </Container>

        <Container
          className={classes.cardGrid}
          maxWidth="md"
          style={{ backgroundColor: "#44857D", borderRadius: "5px" }}
        >
          {" "}
          <Grid container spacing={5}>
            {data.data.map((data) => (
              <Grid
                item
                key={data.id}
                xs={12}
                sm={6}
                md={4}
                style={{ backgroundColor: "#4485D", borderColor: "none" }}
              >
                <Card
                  className={classes.card}
                  border={0}
                  style={{
                    backgroundColor: "#44857D",
                  }}
                >
                  {" "}
                  <Button
                    variant="outlined"
                    style={{
                      position: "relative",
                      top: "50%",
                      zIndex: "modal",
                      color: "#FC0404",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <Link href={`${Routes.CATEGORY}/${data.id}`}>
                      {data.name}
                    </Link>
                  </Button>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`https://picsum.photos/200/300?sig=${data.id}`}
                    title="Image title"
                    style={{ align: "center", borderColor: "#44857D" }}
                  ></CardMedia>
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
export default ComCategories;
