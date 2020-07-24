import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000', // Black
        },
        secondary: {
            main: '#4CBB17',
        },
        graph: {
            main: '#39ab74', // Green from Google's graphs
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
