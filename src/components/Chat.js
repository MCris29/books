import React, {useEffect} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {sendMessage} from "@/lib/chats";

const schema = yup.object().shape({
    message: yup
        .string()
        .required("Ingrese un mensaje"),
});

const useStyles = makeStyles((theme) => ({
    message: {
        margin: "10px",
        padding: "5px",
        background: theme.palette.tertiary.main,
        borderRadius: "5px",
    },
    transmitter: {
        margin: "10px",
        padding: "5px",
        border: "1px solid",
        borderColor: theme.palette.tertiary.main,
        background: "#fff",
        display: "inline-block",
        boxShadow: "4px 4px 10px #8D99AE",
        borderRadius: "5px",
        transform: "rotate(-0.16deg)",
    },
    receiver: {
        margin: "10px",
        padding: "5px",
        background: theme.palette.tertiary.main,
        borderRadius: "5px",
        display: "inline-block",

        boxShadow: "4px 4px 10px #8D99AE",
        transform: "rotate(-0.16deg)",
    },
    receiverContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    chatContainer: {
        padding: "20px 0px",
        overflowY: "scroll",
        [theme.breakpoints.up("md")]: {
            height: "38rem",
        },
        [theme.breakpoints.down("md")]: {
            height: "38rem",
        },
    },
    inputContainer: {
        display: "flex",
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    userName: {
        display: "flex",
        justifyContent: "center",
    },
}));


const Chat = ({chatId, userTransmitter, userTransmitterId}) => {
    const {data, error, mutate} = useSWR(`/chats/${chatId}/messages`, fetcher);
    const classes = useStyles();
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (dataMessage) => {
        console.log("mensaje", dataMessage);

        try {
            const messageData = await sendMessage(chatId, dataMessage);
            mutate();
            document.getElementById("send-message-form").reset();
            console.log("messageData", messageData);
        } catch (e) {
            console.log("error", e);

        }
    }

    if (error) return <div>No se pudo cargar el chat</div>;
    if (!data) return <Loading/>;

    return (
        <div>
            <Typography className={classes.userName}>
                {userTransmitter}
            </Typography>
            <div className={classes.chatContainer}>
                {
                    data.map((chat, index) => (
                        <div
                            key={index}
                            className={(userTransmitterId !== chat.user_id) ? classes.receiverContainer : ""}
                        >
                            <div
                                className={(userTransmitterId !== chat.user_id) ? classes.receiver : classes.transmitter}
                            >
                                {chat.message}
                            </div>
                            <Divider style={{display: "none"}}/>
                        </div>
                    ))
                }
            </div>
            <div className={classes.inputContainer}>
                <form
                    id="send-message-form"
                    className={classes.root}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        id="message"
                        name="message"
                        required
                        className={classes.input}
                        placeholder="Escribe un mensaje"
                        inputRef={register}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <Icon>send</Icon>
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Chat;