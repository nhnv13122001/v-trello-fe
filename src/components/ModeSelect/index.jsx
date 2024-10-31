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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-dark-light-mode-label">Mode</InputLabel>
            <Select
                labelId="select-dark-light-mode-label"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value="light">
                    <Box
                        component="section"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <LightModeIcon fontSize="small" />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value="dark">
                    <Box
                        component="section"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <DarkModeOutlinedIcon fontSize="small" />
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value="system">
                    <Box
                        component="section"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <SettingsBrightnessIcon fontSize="small" />
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect
