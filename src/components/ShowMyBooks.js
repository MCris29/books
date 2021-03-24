import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import ShowMyBook from "@/components/ShowMyBook";
import Link from "@material-ui/core/Link";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    container:{
        display:'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '10px',
        margin:'20px 0px'
    },
    option:{
        float: "right",
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
    },
    button:{
        color: "#003D59",
        backgroundColor: "#F8BF0C",
    },
    add:{
        width:'100%',
        textAlign:"center",
    },
}));

export default function ShowMyBooks() {
    const classes = useStyles();
    const { data, error } = useSWR(`/user/books`, fetcher);

    if (error) return <div>No se pudo cargar la información del artículo</div>;
    if (!data) return <Loading />;
    return (
        <>
            <div className={classes.add}>
                <Link href={`${Routes.BOOKS}/users/book_create`}>
                <Button variant="contained" size="small" className={classes.button} >
                    Nuevo
                </Button>
                </Link>
            </div>
            <h2>LIBROS</h2>
            <div className={classes.container}>
                {data.map((data,index) => (
                        <Card className={classes.root} key={data.id}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`https://picsum.photos/200/300?sig=${index}`}
                                    title={data.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                        {data.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                                        {data.synopsis}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.option}>
                                <Link href={`${Routes.BOOKS}/users/${data.id}`}>
                                <Button variant="contained" size="small" className={classes.button} >
                                    Ver
                                </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                )
                }
            </div>
        </>

    );
}