import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PlaceIcon from "@material-ui/icons/Place";
import BookIcon from "@material-ui/icons/Book";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
        },
    },
    cardContainer: {
        padding: "70px 40px",
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        align: "baseline",
        marginBottom: theme.spacing(2),
    },
}));

const tiers = [
    {
        ico: <AutorenewIcon style={{fontSize: 70, color: "#FE6625"}}/>,
        title: "Intercambia",
        description: "Publica un libro que deseas vender o donar",
        route: "Routes.Books",
    },
    {
        ico: <PlaceIcon style={{fontSize: 70, color: "#167070"}}/>,
        title: "Encuentra",
        description: "Puedes buscar un negocio cerca de ti",
        route: "Routes.Books"
    },
    {
        ico: <BookIcon style={{fontSize: 70, color: "#003D59"}}/>,
        title: "Libros",
        description: "Observa una lista de libros que son novedad ",
        route: "Routes.Books"
    },
];

export default function Pricing() {
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>

            <Grid
                container
                spacing={10}
                alignItems="flex-end"
                className={classes.cardContainer}
            >
                {
                    tiers.map((tier) => (
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.ico}
                                    titleTypographyProps={{align: "center"}}
                                    subheaderTypographyProps={{align: "center"}}
                                    action={tier.title === "Pro" ? <StarIcon/> : null}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h4" color="textPrimary">
                                            {tier.title}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                    >
                                        {tier.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

        </>
    );
}
