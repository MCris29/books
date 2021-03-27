import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Skeleton from "@material-ui/lab/Skeleton";
import {makeStyles} from "@material-ui/core/styles";
import BookCard from "@/components/BookCard";


const useStyles = makeStyles((theme) => ({
    title: {
        color: "#000",
        paddingBottom: "30px",

    },
    cardContainer: {
        minHeight: "345px",
    },
    carouselContainer: {
        height: "100%",
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
        items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const CarouselCards = () => {
    const classes = useStyles();
    const {data, error} = useSWR(`/books`, fetcher);

    if (error) return <div> No se pudo cargar el contenido</div>;
    if (!data)
        return (
            <div className={classes.skeletonContainer}>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
                <Skeleton variant="rect" className={classes.skeleton}/>
            </div>
        );

    return (
        <>
            <Container>
                <Container item xs={12}>
                    <Typography
                        component="h6"
                        variant="h4"
                        className={classes.title}
                    >
                        Novedades
                    </Typography>
                </Container>
                <Container item xs={12} className={classes.carouselContainer}>
                    <Carousel responsive={responsive}>
                        {
                            data.data.map((data, index) => (
                                <div key={index} className={classes.cardContainer}>
                                    <BookCard
                                        data={data}
                                    />
                                </div>
                            ))
                        }
                    </Carousel>
                </Container>
            </Container>
        </>
    )
}

export default CarouselCards;