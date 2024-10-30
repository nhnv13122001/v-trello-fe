import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: 'light',
        primary: {
            main: '#556cd6'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    }
})

export default theme