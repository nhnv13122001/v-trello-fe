import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import BoltIcon from '@mui/icons-material/Bolt'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'

import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
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
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
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
        <InviteBoardUser boardId={board._id} />

        <BoardUserGroup boardUsers={board.FE_allUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar
