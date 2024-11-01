import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                // primary: {
                //     main: '#52ffff'
                // }
            }
        },
        dark: {
            palette: {
                // primary: {
                //     main: '#000'
                // }
            }
        }
    }
})
export default theme
