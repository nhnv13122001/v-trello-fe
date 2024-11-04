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

import { capitalizeFirstLetter } from '~/utils/formatter'

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

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        overflowX: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label='Add To Google Drive'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label='Automation'
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label='Filter'
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
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
              transition: 'all 0.3s ease',
              color: '#ffffff',
              cursor: 'pointer',
              '&:first-of-type': {
                backgroundColor: '#a4b0be'
              }
            },
            '&:hover .MuiAvatar-root': {
              marginRight: '10px'
            }
          }}
        >
          <Tooltip title='v-trello'>
            <Avatar
              alt='Remy Sharp'
              src='https://static.wikia.nocookie.net/narutoprofile/images/c/cd/Sasori.jpg'
            />
          </Tooltip>
          <Tooltip title='v-trello'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.pinimg.com/originals/21/b3/22/21b3227c9dc6b14aef454eb3b6f94c1d.jpg'
            />
          </Tooltip>
          <Tooltip title='v-trello'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.pinimg.com/736x/2f/4a/42/2f4a4231d4373e54de763a1d4966ba07.jpg'
            />
          </Tooltip>
          <Tooltip title='v-trello'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.pinimg.com/564x/db/1b/f1/db1bf111955556475c57c8b5dc20de28.jpg'
            />
          </Tooltip>
          <Tooltip title='v-trello'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.pinimg.com/564x/1b/b9/1a/1bb91a918d3e01d54dc7fbecabb97197.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
