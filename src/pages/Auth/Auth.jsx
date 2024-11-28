import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

function Auth() {
  const location = useLocation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
        background: 'url("src/assets/auth/login-register-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {location.pathname === '/login' && <Login />}
      {location.pathname === '/register' && <Register />}
    </Box>
  )
}

export default Auth
