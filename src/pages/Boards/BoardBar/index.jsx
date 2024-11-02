import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import BoltIcon from '@mui/icons-material/Bolt'
import AvatarGroup from '@mui/material/AvatarGroup'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'

const MENU_STYLES = {
    px: '5px',
    border: 'none',
    borderRadius: '4px',
    color: 'primary.main',
    backgroundColor: 'white',
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover': {
        backgroundColor: 'primary.50'
    }
}

function BoardBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: 2,
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                overflowX: 'auto',
                borderTop: '1px solid #00bfa5'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />}
                    label="MERN Stack Board"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add To Google Drive"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />}
                    label="Filter"
                    clickable
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="outlined" startIcon={<PersonAddIcon />}>
                    Invite
                </Button>
                <AvatarGroup
                    max={4}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: '34px',
                            height: '34px',
                            fontSize: '16px'
                        }
                    }}
                >
                    <Tooltip title="v-trello">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="v-trello">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="v-trello">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="v-trello">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="v-trello">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar
