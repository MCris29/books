import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import useSWR from "swr";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import Loading from "@/components/Loading";
import Chat from "@/components/Chat"

import {useAuth} from "@/lib/auth";
import {fetcher} from "@/lib/utils";


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    chatIcon: {
        position: 'fixed',
        bottom: '40px',
        right: '40px',
    },
    ico: {
        color: '#fff',
        transform: 'rotateY(180deg)',
    },
    container: {
        minWidth: "320px",
        maxWidth: "320px",
    },
}));

const ListChats = () => {
    const classes = useStyles();
    const {user} = useAuth();
    const [state, setState] = React.useState(false);
    const [stateChat, setStateChat] = React.useState(false);
    const [chatId, setChatId] = React.useState(null);
    const [userTransmitter, setUserTransmitter] = React.useState(null);
    const [userTransmitterId, setUserTransmitterId] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);
    const {data, error, mutate} = useSWR(`/chats`, fetcher);

    if (error) return <div></div>;
    if (!data) return <Loading/>;

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        mutate();
        handleCurrentUser();
        setState(open);
    };

    const handleCurrentUser = () => {
        setCurrentUser(user.id);
        console.log("ID usuario actual", user.id);
    }

    const handleChat = (chatData) => {

        setChatId(chatData.id);

        if (currentUser === chatData.id_user1) {
            setUserTransmitterId(chatData.id_user2);
            setUserTransmitter(chatData.user2);

        } else {
            setUserTransmitterId(chatData.id_user1);
            setUserTransmitter(chatData.user1);

        }

        handleStateChat(true);
    }

    const handleStateChat = (state) => {
        setStateChat(state);
    }

    const chatList = (
        <div
            role="presentation"
            className={classes.container}
        >
            <Button onClick={toggleDrawer(false)}>Atrás</Button>
            <List>
                {data.data.map((chat, index) => (
                    <div key={index}>
                        {
                            user
                                ? < ListItem button onClick={() => handleChat(chat)}>
                                    {
                                        currentUser === chat.id_user1
                                            ? <ListItemText primary={chat.user2}/>
                                            : <ListItemText primary={chat.user1}/>
                                    }
                                </ListItem>
                                : <div>Cargando...</div>
                        }
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            {
                user
                    ? <div>
                        <Fab
                            className={classes.chatIcon}
                            color="primary"
                            aria-label="add"
                            onClick={toggleDrawer(true)}
                        >
                            <Icon className={classes.ico}>chat_bubble</Icon>
                        </Fab>
                        <Drawer
                            anchor="right"
                            open={state}
                            onClose={toggleDrawer(false)}
                        >
                            {
                                stateChat
                                    ? <div
                                        role="presentation"
                                        className={classes.container}
                                    >
                                        <Button onClick={() => handleStateChat(false)}>Atrás</Button>
                                        <Chat
                                            chatId={chatId}
                                            userTransmitter={userTransmitter}
                                            userTransmitterId={userTransmitterId}
                                        />
                                    </div>
                                    : chatList
                            }
                        </Drawer>
                    </div>
                    : <></>
            }
        </React.Fragment>
    );
}

export default ListChats;