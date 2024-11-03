import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {}
        },
        dark: {
            palette: {}
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: '#dcdde1'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        background: '#ffffff'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderWidth: '1px',
                    '&:hover': {
                        borderWidth: '1px'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderWidth: '1px'
                    },
                    '&:hover fieldset, &.Mui-focused fieldset': {
                        borderWidth: '2px'
                    }
                }
            }
        }
    }
})
export default theme
