import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import {fade, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    search: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    searchButton: {
        color: "#fff",
        padding: "6px",
        width: "2em",
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: fade(theme.palette.secondary.main, 0.8),
        },
        borderRadius: "0px 7px 7px 0px",
    },
    inputRoot: {
        color: "#000",
        borderRadius: "7px 0px 0px 7px",
        backgroundColor: fade(theme.palette.common.white, 1),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: "calc(1em + 7px)",
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const SearchBar = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.search}>
                <InputBase
                    placeholder="Buscar"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
                <IconButton type="submit" className={classes.searchButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </div>
        </>
    )

}

export default SearchBar;