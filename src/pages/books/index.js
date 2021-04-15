import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import BookCard from "@/components/BookCard";

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
}));

const book = () => {
    const classes = useStyles();

    const {data, error} = useSWR(`/books`, fetcher);

    if (error) return <div>No se pudo cargar el contenido</div>;
    if (!data)
        return (
            <div>
                <Loading/>
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
                <Grid item xs={12}>
                    <Typography
                        component="h6"
                        variant="h4"
                        className={classes.title}
                    >
                        Catalogo
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{display: "contents"}}>
                    {
                        data.data.map((data, index) => (
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
export default book;
