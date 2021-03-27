import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import Routes from "@/constants/routes";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "0 30px",
    },
    media: {
        height: 140,
    },
    title: {
        width: "230px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    link: {
        color: "#fff",
    },
});

const BookCard = ({data}) => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <Link href={`${Routes.BOOKS}/${data.id}`} className={classes.link}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={`https://picsum.photos/200/300?sig=${data.id}`}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom variant="h6" component="h2"
                                color="textPrimary"
                                className={classes.title}
                            >
                                {data.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.author}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                $ {data.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <Button size="small" color="primary">
                        Contactar
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default BookCard;