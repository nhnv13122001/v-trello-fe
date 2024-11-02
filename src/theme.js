import { blue, lightBlue } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: lightBlue
            }
        },
        dark: {
            palette: {
                // primary: {
                //     main: '#000'
                // }
            }
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: '#bdc3c7',
                        borderRadius: '3px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        background: '#74b9ff'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem'
                })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light
                    },
                    '&:hover ': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main
                        }
                    },
                    '& fieldset': {
                        borderWidth: '1px !important'
                    }
                })
            }
        }
    }
})
export default theme
