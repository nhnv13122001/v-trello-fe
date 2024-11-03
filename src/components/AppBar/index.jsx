import { useState } from 'react'
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
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

function AppBar() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                overflowX: 'auto',
                paddingX: 2,
                color: '#ffffff',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
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

                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        gap: 2
                    }}
                >
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button
                        sx={{ color: '#ffffff' }}
                        startIcon={<LibraryAddIcon />}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    size="small"
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    value={searchValue}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#ffffff' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <CloseIcon
                                onClick={() => {
                                    setSearchValue('')
                                }}
                                fontSize="small"
                                sx={{
                                    display: searchValue || 'none',
                                    color: '#ffffff',
                                    cursor: 'pointer'
                                }}
                            />
                        )
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label, & input, & label.Mui-focused': {
                            color: '#ffffff'
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset, &:hover fieldset, &.Mui-focused fieldset':
                                {
                                    borderColor: '#ffffff'
                                }
                        }
                    }}
                />
                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="warning" variant="dot">
                        <NotificationsNoneIcon sx={{ cursor: 'pointer' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
