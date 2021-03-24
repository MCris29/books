import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Routes from "@/constants/routes";
import {Books} from "@/lib/books";

const useStyles = makeStyles((theme) => ({
    container:{
        textAlign: "center",
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1.5),
            width: '25ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: 0,
        margin:'15px 0px'
    },
    buttons:{
        textAlign: "right",
        marginBottom:'15px',
    },
    upgrade:{
        marginLeft:'5px'
    },
    synopsis:{
        minWidth:"100%",
        color:"black"
    }
}));

const ShowMyBook = (props) => {
    const classes = useStyles();
    const handleDelete =async()=>{
        try {
            await Books.deleteBook(props.id)
        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }
    const { data, error } = useSWR(`/books/${props.id}`, fetcher);
    if (error) return <div>No se pudo cargar la información del libro</div>;
    if (!data) return <Loading />;
return (
        <Container maxWidth="sm" className={classes.container}>
            <h2>{data.title}</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-read-only-input"
                    label="Autor"
                    defaultValue= {data.author}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Editorial"
                    defaultValue={data.editorial}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Fecha"
                    defaultValue= {data.year_edition}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Paginas"
                    defaultValue= {data.pages}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Categoria"
                    defaultValue= {data.category}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Precio"
                    defaultValue= {data.price}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <div>
                    <TextField
                        id="synopsis"
                        name="synopsis"
                        label="Descripcion"
                        style={{ margin: 8 }}
                        defaultValue={data.synopsis}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        className={classes.synopsis}
                    />
                </div>
            </form>
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
            <div className={classes.buttons}>
                {/*<Button
                    variant="contained"
                    size="small"
                    style={{
                        color: "#FAFAFA",
                        backgroundColor: "red",
                    }}
                    onClick={handleDelete}
                >
                    Eliminar
                </Button>*/}
                <Link href={`${Routes.BOOKS}/users/update/${data.id}`}>
                <Button
                    variant="contained"
                    size="small"
                    style={{
                        color: "#003D59",
                        backgroundColor: "#F8BF0C",
                    }}
                    className={classes.upgrade}
                >
                    Actualizar
                </Button>
                </Link>
            </div>
        </Container>
)
};

export default ShowMyBook;