import React from "react";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    backMain: {
        backgroundImage: `url(${"https://picsum.photos/200/300?sig"})`,
        padding: "50px",
    },
    text: {
        fontSize: "x-large",
        textAlign: "center",
    },
}));

export default function Album() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <CardMedia className={classes.backMain}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="primary"
                                gutterBottom
                            >
                                Books
                            </Typography>
                            <Typography className={classes.text}>
                                ¿Buscas un libro, pero no sabes donde comprarlo?
                                Books contiene los repositorios de pequeños negocios que
                                promocionan sus libros, así puedes ubicar la tienda y contactar
                                con el propietario.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={Routes.BOOKS}
                                        >
                                            Ver libros
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </CardMedia>
                </div>
            </main>
        </React.Fragment>
    );
}
