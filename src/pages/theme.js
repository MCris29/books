import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FB9334',
        },
        secondary: {
            main: '#FE6625',
        },
        tertiary: {
            main: '#44857D',
        },
        quaternary:{
            main: '#167070',
        },
        quinary:{
            main: '#003D59',
        },
        senary:{
            main: '#414A4F'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff"',
        },
    },
});

export default theme;