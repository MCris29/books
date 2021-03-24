import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import {makeStyles} from "@material-ui/core/styles";
import {fetcher} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Loading from "@/components/Loading";
import Box from "@material-ui/core/Box";
import {
    Button,
    Grid, Paper,
    TextField
} from "@material-ui/core";
import api from "@/lib/api";
import * as yup from "yup";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        color: "#003D59",
        backgroundColor: "#F8BF0C",
        float: "rigth",
    },
    buttoncancel: {
        margin: theme.spacing(3, 2, 2),
        color: "#003D59",
        backgroundColor: "#D80D03",
        float: "rigth",
    },
}));

const styles = {
    Container: {
        background: 'linear-gradient(0deg, rgba(168,254,216,1) 0%, rgba(96,149,176,1) 100%)',
        textAlign: 'center',
        padding: '40px'
    },
    Paper: {
        backgroundColor: 'rgba(255,255,255)',
        margin: '10px',
        padding: '35px',
    },
};

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
});

const ProfileDetails = () => {

    const [checkValidate, setCheckValidate] = useState(true);
    const {data, error} = useSWR(`/user`, fetcher);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const userDataSend = {
            name: data.name,
            last_name: data.last_name,
            nickname: data.nickname,
            email: data.email,
        };
        try {
            const response = await api.put(`/user`, userDataSend);
            setCheckValidate(!checkValidate);
            setOpen(false);
            return response;
        } catch (error) {
            if (error.response) {
                Error(error.response.data.errors)
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error Message", error.message);
            }
            console.log(error.config);
        }
    };

    const handleChangeCheck = () => {
        setCheckValidate(!checkValidate);
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    if (error) return <div>Error</div>;
    if (!data) return <Loading/>;

    return (
        <>
            <div>
                <Box display="flex" justifyContent="center" m={1} p={1} >
                    <h1>Información personal</h1>
                </Box>
                <Grid container justify="center" >

                    <Grid xs={12} sm={12} md={7} lg={7} >
                    {
                                checkValidate ? 
                                (
                                    <Paper style={styles.Paper} elevation={3}>
                                        <Box display="block" justifyContent="left" m={1} p={1}>
                                            <h2><strong>Nombre: </strong>{data.user.name}</h2>
                                            <h2><strong>Apellido: </strong>{data.user.last_name}</h2>
                                            <h2><strong>Apodo: </strong>{data.user.nickname}</h2>
                                            <h2><strong>Correo electrónico: </strong>{data.user.email}</h2>
                                        </Box>
                                        <Button
                                            onClick={handleChangeCheck}
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            textAling="right"
                                        >
                                            Editar
                                        </Button>
                                    </Paper>
                                )
                                :
                            <Paper style={styles.Paper} elevation={3} >
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <TextField
                                                defaultValue={data.user.name}
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                            />
                                            <TextField
                                                defaultValue={data.user.last_name}
                                                id="last_name"
                                                name="last_name"
                                                label="Apellido"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                            />
                                            <TextField
                                                defaultValue={data.user.nickname}
                                                id="nickname"
                                                name="nickname"
                                                label="Apodo"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                            />
                                            <TextField
                                                defaultValue={data.user.email}
                                                id="email"
                                                name="email"
                                                label="Correo electrónico"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                            />
                                        </Grid>

                                    </Grid>
                                    <Box display="flex" justifyContent="left" m={1} p={1}>
                                    <div>
                                        <Button
                                                type="submit"
                                                variant="outlined"
                                                className={classes.submit,classes.button}
                                                onClick={handleClickOpen}
                                                key={data.id}
                                            >
                                                Guardar cambios
                                            </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Confirmar cambios"}</DialogTitle>
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                ¿Guardar la información?
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleClose} className={classes.buttoncancel}>
                                                Cancelar
                                            </Button>
                                            <Button onClick={onSubmit} className={classes.button} autoFocus>
                                                Aceptar
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                        </div>
                                        <div>
                                            
                                            <Button
                                                onClick={handleChangeCheck}
                                                variant="contained"
                                                className={classes.buttoncancel}
                                                key={data.id}    
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </Box>
                                </form>
                            </Paper>
                    }
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default withAuth(ProfileDetails);