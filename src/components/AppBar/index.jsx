import Box from '@mui/material/Box'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import ModeSelect from '../ModeSelect'
import Profiles from './Menus/Profiles'
import Badge from '@mui/material/Badge'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Workspaces from './Menus/Workspaces'
import AppsIcon from '@mui/icons-material/Apps'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

function AppBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                p: 2
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main'
                    }}
                >
                    <SvgIcon
                        component={TrelloIcon}
                        fontSize="small"
                        inheritViewBox
                    />
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Trello
                    </Typography>
                </Box>
                <Workspaces />
                <Recent />
                <Starred />
                <Templates />
                <Button variant="outlined">Create</Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="search"
                    size="small"
                />
                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="error" variant="dot">
                        <NotificationsNoneIcon
                            sx={{ cursor: 'pointer', color: 'primary.main' }}
                        />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon
                        sx={{ cursor: 'pointer', color: 'primary.main' }}
                    />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
