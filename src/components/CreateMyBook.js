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
import { useForm } from "react-hook-form";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Books } from "@/lib/books";
import { mutate } from "swr";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Link from "@material-ui/core/Link";
import Routes from "@/constants/routes";

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
    formControl: {
        margin: theme.spacing(1.5),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    synopsis:{
        minWidth:"100%"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mpaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const CreateMyBook = () => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState(1);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [newbook, setNewbook] = React.useState(1);

    const handleChangeNew = (event) => {
        setNewbook(event.target.value);
    };``

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = async (data) => {
        console.log("data", data.cover_page[0]);
        console.log("data", data.back_cover[0]);
        console.log("All", data);
        console.log("cate",age);
        console.log("nwe",newbook);
        const nbo = newbook;
        const cbo = age;
        const newBook = {
            category_id:cbo,
            title: data.title,
            author: data.author,
            editorial: data.editorial,
            year_edition: data.year_edition,
            price: data.price,
            pages: data.pages,
            synopsis: data.synopsis,
            cover_page: data.cover_page[0],
            back_cover: data.back_cover[0],
            available: "1",
            nb: nbo,
        };
        console.log("veamos", newBook)
        const formData = new FormData();
        formData.append("title", newBook.title);
        formData.append("author", newBook.author);
        formData.append("category_id", newBook.category_id);
        formData.append("editorial", newBook.editorial);
        formData.append("year_edition", newBook.year_edition);
        formData.append("price", newBook.price);
        formData.append("pages", newBook.pages);
        formData.append("synopsis", newBook.synopsis);
        formData.append("cover_page", newBook.cover_page);
        formData.append("back_cover", newBook.back_cover);
        formData.append("available", newBook.available);
        formData.append("new", newBook.nb);


        try {
            await Books.create(formData);
            // console.log("file", fileInputRef.current.files[0]);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
    };
    const { data, error } = useSWR(`/categories`, fetcher);
    if (error) return <div>No se pudo cargar la información del libro</div>;
    if (!data) return <Loading />;
    return (
        <Container maxWidth="sm" className={classes.container}>
            <h2>Nuevo Libro</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="title"
                    name="title"
                    label="Titulo"
                    required
                    inputRef={register}
                    variant="outlined"
                />
                <TextField
                    id="author"
                    name="author"
                    label="Autor"
                    inputRef={register}
                    required
                    variant="outlined"
                />
                <TextField
                    id="editorial"
                    name="editorial"
                    label="Editorial"
                    required
                    inputRef={register}
                    variant="outlined"
                />
                <TextField
                    id="year_edition"
                    name="year_edition"
                    label="Año de edición"
                    type="number"
                    required
                    inputRef={register}
                    variant="outlined"
                />
                <TextField
                    id="pages"
                    type="number"
                    name="pages"
                    label="Paginas"
                    required
                    inputRef={register}
                    variant="outlined"
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange}
                        label="Categoria"
                        required
                    >
                        {data.data.map((data,index) => (
                                <MenuItem value={data.id}>{data.name}</MenuItem>
                            )
                        )
                        }

                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Nuevo</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={newbook}
                        onChange={handleChangeNew}
                        label="Nuevo"
                        required
                    >
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={1}>Si</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="price"
                    name="price"
                    type="number"
                    label="Precio"
                    inputRef={register}
                    variant="outlined"
                />
                <div>
                    <TextField
                        id="synopsis"
                        name="synopsis"
                        label="Descripcion"
                        style={{ margin: 8 }}
                        placeholder="Descripcion"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        inputRef={register}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        className={classes.synopsis}
                    />
                </div>

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <label>
                            Portada
                            <input name="cover_page" type="file" ref={register} />
                        </label>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <label>
                            Contraportada
                            <input name="back_cover" type="file" ref={register} />
                        </label>
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Link href={`${Routes.BOOKS}/users`}>
                    <Button
                        variant="contained"
                        size="small"
                        style={{
                            color: "#FAFAFA",
                            backgroundColor: "red",
                        }}
                    >
                        Cancelar
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    style={{
                        color: "#003D59",
                        backgroundColor: "#F8BF0C",
                    }}
                    className={classes.upgrade}
                    onClick={handleOpen}
                >
                    Crear
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.mpaper}>
                            <h2 id="transition-modal-title">Se Guardo el nuevo libro</h2>
                            <Link href={`${Routes.BOOKS}/users`}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                    style={{
                                        color: "#003D59",
                                        backgroundColor: "#F8BF0C",
                                    }}
                                    className={classes.upgrade}
                                >
                                    Aceptar
                                </Button>
                            </Link>
                        </div>
                    </Fade>
                </Modal>
            </div>
            </form>
        </Container>
    )
};

export default CreateMyBook;