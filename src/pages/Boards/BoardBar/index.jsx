import Box from '@mui/material/Box'

function BoardBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                backgroundColor: 'primary.light'
            }}
        >
            Board Bar
        </Box>
    )
}

export default BoardBar
