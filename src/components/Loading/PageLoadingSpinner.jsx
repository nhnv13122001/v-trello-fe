import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        height: '100vh',
        width: '100vw',
        color: '#ffffff',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <CircularProgress color='inherit' />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
