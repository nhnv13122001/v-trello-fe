import Box from '@mui/material/Box'

import ModeSelect from '../ModeSelect'

function AppBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                backgroundColor: 'primary.main'
            }}
        >
            <ModeSelect></ModeSelect>
        </Box>
    )
}

export default AppBar
