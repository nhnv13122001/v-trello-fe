import { useState } from 'react'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Logout from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'

function Profiles() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ p: 0 }}
                    aria-controls={open ? 'basic-menu-profiles' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/123772445_2682345688692316_5804252625951566209_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=L8AbOFovDuIQ7kNvgGFPuDV&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ArevpR97mjw3R3Ena0urckc&oh=00_AYByZ9HAgX_n61g9GTCYf_4YbQp78ALlLpDgtb_1kuhC9g&oe=674C505C"
                        alt="Sasori"
                        sx={{ width: 36, height: 36 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-profiles"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-profiles'
                }}
            >
                <MenuItem>
                    <Avatar sx={{ width: '28px', height: '28px', mr: 2 }} />
                    Profile
                </MenuItem>
                <MenuItem>
                    <Avatar sx={{ width: '28px', height: '28px', mr: 2 }} />
                    My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Profiles
