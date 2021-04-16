import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import {useRouter} from "next/router";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import BookCard from "@/components/BookCard";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "50px",
    },
    cardContainer: {
        minHeight: "345px",
    },
    title: {
        color: theme.palette.quinary.main,
        padding: "20px",
    },
    skeleton: {
        borderRadius: "10px",
        [theme.breakpoints.up("xs")]: {
            width: "100px",
            height: "100px",
            margin: "10px 30px",
        },
        [theme.breakpoints.up("md")]: {
            width: "345px",
            height: "240px",
            margin: "30px",
        },
    },
    skeletonContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "0 30px",
    },
    skeletonText: {
        [theme.breakpoints.up("xs")]: {
            margin: "0px 50px",
        },
        [theme.breakpoints.up("md")]: {
            margin: "0 350px",
        },
    },
}));

const category = () => {
    const router = useRouter();
    const classes = useStyles();
    const {categoryId} = router.query;
    const {data, error} = useSWR(`/books/categories/${categoryId}`, fetcher);

    if (error) return <div>No se pudo cargar la información libro</div>;
    if (!data)
        return (
            <div>
                <Skeleton variant="rect" className={classes.skeletonText}/>
                <div className={classes.skeletonContainer}>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                </div>
                <div className={classes.skeletonContainer}>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                    <Skeleton variant="rect" className={classes.skeleton}/>
                </div>
            </div>
        );

    return (
        <>
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Typography
                        component="h6"
                        variant="h4"
                        className={classes.title}
                        style={{textAlign: "center"}}
                    >
                        Resultados encontrados
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{display: "contents"}}>
                    {
                        data.map((data, index) => (
                            <div key={index} className={classes.cardContainer}>
                                <BookCard
                                    data={data}
                                />
                            </div>
                        ))}
                </Grid>
            </Grid>
        </>
    );
};

export default category;
