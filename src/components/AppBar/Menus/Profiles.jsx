import { useState } from 'react'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Logout from '@mui/icons-material/Logout'
import { useConfirm } from 'material-ui-confirm'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'
import { useSelector, useDispatch } from 'react-redux'

import { logoutAPI, selectCurrentUser } from '~/redux/user/userSlice'

function Profiles() {
  const dispatch = useDispatch()
  const confirmLogout = useConfirm()
  const currentUser = useSelector(selectCurrentUser)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    })
      .then(() => dispatch(logoutAPI()))
      .catch(() => {})
  }

  return (
    <div>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            src={currentUser?.avatar}
            alt='Sasori'
            sx={{ width: 36, height: 36 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu-profiles'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <Link
          style={{
            color: 'inherit'
          }}
          to='/settings/account'
        >
          <MenuItem
            sx={{
              '&:hover': {
                color: 'success.light'
              }
            }}
          >
            <Avatar
              src={currentUser?.avatar}
              alt='Sasori'
              sx={{ width: '28px', height: '28px', mr: 2 }}
            />
            Profile
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            '&:hover': {
              color: 'warning.dark',
              '& .logout-icon': {
                color: 'warning.dark'
              }
            }
          }}
        >
          <ListItemIcon>
            <Logout className='logout-icon' fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Profiles
