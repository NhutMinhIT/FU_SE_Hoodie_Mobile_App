import { extendTheme } from 'native-base'


export const customTheme = extendTheme({
    colors: {
        // Add new color
        green: {
            300: '#538175'
        },
        primary: {
            50: '#E3F2F9',
            100: '#C5E4F3',
            200: '#A2D4EC',
            300: '#7AC1E4',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#003F5E',
        },
        // Redefining only one shade, rest of the color will remain same.
        amber: {
            400: '#d97706',
        },
    },

});