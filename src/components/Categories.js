import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
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
        maxWidth: "100%",
        backgroundColor: "#44857D",
    },
    cardContainer: {
        backgroundColor: "#4485D",
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#cfd3d6",
        borderColor: "none",
        boxShadow: "none",
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

const Categories = () => {
    const classes = useStyles();
    const {data, error} = useSWR(`/categories`, fetcher);

    if (error) return <div>No se pudo cargar el contenido</div>;
    if (!data)
        return (
            <div>
                <Loading/>
            </div>
        );

    return (
        <>
            <CssBaseline/>

            <Container
                className={classes.cardGrid}
                maxWidth="md"
            >
                <Typography
                    component="h6"
                    variant="h4"
                    style={{color: "#fff", paddingTop: "30px"}}
                >
                    Categorias
                </Typography>
            </Container>
            <Container
                className={classes.cardGrid}
                maxWidth="md"
            >
                <Grid container spacing={5}>
                    {
                        data.data.map((data) => (
                            <Grid
                                item
                                key={data.id}
                                xs={12} sm={4} md={3}
                                className={classes.cardContainer}
                            >
                                <Card
                                    className={classes.card}
                                    border={0}
                                    style={{
                                        backgroundColor: "#44857D",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        style={{
                                            position: "relative",
                                            top: "50%",
                                            zIndex: "modal",
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
                                        style={{align: "center", borderColor: "#44857D"}}
                                    />
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </>
    );
};
export default Categories;
