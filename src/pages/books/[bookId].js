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
        flexGrow: 1,
        [theme.breakpoints.up("xs")]: {
            padding: '30px',
        },
        [theme.breakpoints.up("md")]: {
            padding: '0px 60px 60px',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
    },
    cover: {
        [theme.breakpoints.up("md")]: {
            display: 'flex',
        },
    },
    td: {
        textAlign: 'right'
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
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <h2>{data.title}</h2>
                        <table className={classes.table}>
                            <tr>
                                <td className={classes.td}><b>Autor:</b></td>
                                <td>{data.author}</td>
                            </tr>
                            <tr>
                                <td className={classes.td}><b>Editorial:</b></td>
                                <td>{data.editorial}</td>
                            </tr>
                            <tr>
                                <td className={classes.td}><b>Fecha:</b></td>
                                <td>{data.year_edition}</td>
                            </tr>
                            <tr>
                                <td className={classes.td}><b>Pagina:</b></td>
                                <td>{data.pages}</td>
                            </tr>
                            <tr>
                                <td className={classes.td}><b>Categoria:</b></td>
                                <td>{data.category}</td>
                            </tr>
                            <tr>
                                <td className={classes.td}><b>Precio:</b></td>
                                {
                                    data.price === 0
                                        ? <td>Gratis</td>
                                        : <td>$ {data.price}</td>
                                }
                            </tr>
                        </table>
                        <br/>
                        {
                            user === false
                                ? (<div>
                                        <Button variant="contained" disabled>
                                            Contactar
                                        </Button>
                                        <p style={{color: "red"}}>
                                            * Tiene que estar registrado para contactar con el vendedor
                                        </p>
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
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.cover}>
                        <Paper className={classes.paper}>
                            <img src={'https://picsum.photos/200/300'}/>
                        </Paper>
                        <Paper className={classes.paper}>
                            <img src={'https://picsum.photos/200/300'}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Descripcion:</h3>
                        {data.synopsis}
                    </Grid>

                </Grid>
            </div>
        </>
    );
}

