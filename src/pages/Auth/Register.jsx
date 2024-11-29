import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import { Link, useNavigate } from 'react-router-dom'

import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { registerAPI } from '~/apis'

function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()
  const handleRegister = (data) => {
    const { email, password } = data
    toast
      .promise(registerAPI({ email, password }), {
        pending: 'Registration is in process...'
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <TrelloIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              color: (theme) => theme.palette.grey[500]
            }}
          >
            Author: Nhnv13122001
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label='Enter Email...'
                type='text'
                variant='outlined'
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='email' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Enter Password...'
                type='password'
                variant='outlined'
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='password' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Enter Password Confirmation...'
                type='password'
                variant='outlined'
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true
                    return PASSWORD_CONFIRMATION_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName='password_confirmation'
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
            >
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Typography
                sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
              >
                Log in!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default Register
