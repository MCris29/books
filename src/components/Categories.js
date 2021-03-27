import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Routes from "@/constants/routes";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    title: {
        color: "#fff",
        paddingBottom: "30px",

    },
    cardGrid: {
        maxWidth: "100%",
        backgroundColor: "#44857D",
        margin: "20px 0",
        padding: "30px 0",
    },
    cardContainer: {
        margin: "0 20px",
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
        display: "flex",
    },
    link: {
        color: "rgba(0,0,0,0)",
    },
    cardTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    textTitle: {
        width: "100%",
        textAlign: "center",
        backdropFilter: "brightness(0.5)",
        color: "#fff",
    },
    skeleton: {
        width: "320px",
        height: "118px",
        margin: "30px",
    },
    skeletonContainer: {
        display: "flex",
        justifyContent: "center",
    },
}));

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 5
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 3
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const Categories = () => {
    const classes = useStyles();
    const {data, error} = useSWR(`/categories`, fetcher);

    if (error) return <div>No se pudo cargar el contenido</div>;
    if (!data)
        return (
            <div className={classes.skeletonContainer}>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
            </div>
        );

    return (
        <>
            <CssBaseline/>
            <Container
                className={classes.cardGrid}
                maxWidth="md"
            >
                <Container item xs={12}>
                    <Typography
                        component="h6"
                        variant="h4"
                        className={classes.title}
                    >
                        Categorias
                    </Typography>
                </Container>
                <Container item xs={12}>
                    <Carousel responsive={responsive}>
                        {
                            data.data.map((data) => (
                                <div key={data.id} className={classes.cardContainer}>
                                    <Link href={`${Routes.CATEGORY}/${data.id}`} className={classes.link}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={`https://picsum.photos/200/300?sig=${data.id}`}

                                                >
                                                    <CardContent className={classes.cardTitle}>
                                                        <Typography gutterBottom variant="h5" component="h3"
                                                                    className={classes.textTitle}
                                                        >
                                                            {data.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardMedia>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                    </Carousel>
                </Container>
            </Container>
        </>
    );
};
export default Categories;
