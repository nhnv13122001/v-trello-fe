import { Typography } from '@mui/material'
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
            <p style={{ fontSize: '1rem' }}>h1. Heading</p>
        </Box>
    )
}

export default BoardBar
