import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import {useRouter} from 'next/router'
import Loading from "@/components/Loading";
import {useAuth} from "@/lib/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 10%'
    },
    information: {
        display: 'inline-block',
        width: '50%',
        flexGrow: 1,
        padding: 20,
    },
    images: {
        display: 'inline-block',
        width: '50%',
        flexGrow: 1,
        padding: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: 0,
    },
    table: {
        width: '70%'
    },
    td: {
        width: '15%'
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    description: {
        margin: '20px 0'
    },
    alertP: {
        color: "red",
    },
}));


export default function BookId() {
    const classes = useStyles();
    const router = useRouter()
    const {bookId} = router.query
    const {data, error} = useSWR(`/books/${bookId}`, fetcher);
    const {user} = useAuth();
    if (error) return <div>No se pudo cargar la información del artículo</div>;
    if (!data) return <Loading/>;

    return (
        <div className={classes.root}>
            <div className={classes.information}>
                <h2>{data.title}</h2>
                <table className={classes.table}>
                    <tr>
                        <td className={classes.td}><b>Autor</b></td>
                        <td>{data.author}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}><b>Editorial</b></td>
                        <td>{data.editorial}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}><b>Fecha</b></td>
                        <td>{data.year_edition}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}><b>Pagina</b></td>
                        <td>{data.pages}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}><b>Categoria</b></td>
                        <td>{data.category}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}><b>Precio</b></td>
                        <td>{data.price}</td>
                    </tr>
                </table>
                <br/>
                {
                    user === false
                        ? (<div>
                                <Button variant="contained" disabled>
                                    Contactar
                                </Button>
                                <p className={classes.alertP}>* Tiene que estar registrado para contactar con el
                                    vendedor</p>
                            </div>
                        )
                        : (<Button
                                variant="contained"
                                size="small"
                                style={{
                                    color: "#003D59",
                                    backgroundColor: "#F8BF0C",
                                }}
                            >
                                Contactar
                            </Button>
                        )}

            </div>
            <div className={classes.images}>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img src={'https://picsum.photos/200/300'}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img src={'https://picsum.photos/200/300'}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.description}>
                <h3>Descripcion</h3>
                {data.synopsis}
            </div>
        </div>
    );
}

