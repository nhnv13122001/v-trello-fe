import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl size='small' sx={{ minWidth: '120px' }}>
      <InputLabel
        id='select-dark-light-mode-label'
        sx={{
          color: '#ffffff',
          '&.Mui-focused': {
            color: '#ffffff'
          }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId='select-dark-light-mode-label'
        id='select-dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleChange}
        sx={{
          color: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#ffffff'
            },
          '& .MuiSvgIcon-root': { color: '#ffffff' }
        }}
      >
        <MenuItem value='light'>
          <Box
            component='section'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <LightModeIcon fontSize='small' />
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box
            component='section'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <DarkModeOutlinedIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box
            component='section'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <SettingsBrightnessIcon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
