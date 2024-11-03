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
    paddingX: '5px',
    borderRadius: '4px',
    color: '#ffffff',
    backgroundColor: 'transparent',
    '& .MuiSvgIcon-root': {
        color: '#ffffff'
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
                paddingX: 2,
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                overflowX: 'auto',
                borderBottom: '1px solid #ffffff',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
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
                <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: '#ffffff',
                        borderColor: '#ffffff',
                        '&:hover ': {
                            borderColor: '#ffffff',
                            opacity: '0.8'
                        }
                    }}
                >
                    Invite
                </Button>
                <AvatarGroup
                    max={4}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: '34px',
                            height: '34px',
                            fontSize: '16px',
                            border: '1px solid #cccccc',
                            transition: 'all 0.3s ease'
                        },
                        '&:hover .MuiAvatar-root': {
                            marginRight: '10px'
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
