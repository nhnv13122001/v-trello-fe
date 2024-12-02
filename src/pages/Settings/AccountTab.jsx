import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MailIcon from '@mui/icons-material/Mail'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import InputAdornment from '@mui/material/InputAdornment'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  // Những thông tin của user để init vào form (key tương ứng với register phía dưới Field)
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }
  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data

    // Nếu không có sự thay đổi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    toast
      .promise(dispatch(updateUserAPI({ displayName })), {
        pending: 'Updating...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('User updated successfully')
        }
      })
  }

  const uploadAvatar = (e) => {
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    // Sai:  console.log('reqData: ', reqData)
    // Đúng: for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    toast
      .promise(dispatch(updateUserAPI(reqData)), { pending: 'Updating...' })
      .then((res) => {
        if (!res.error) {
          toast.success('User updated successfully!')
        }
        e.target.value = ''
      })
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt='Sasori'
              src={currentUser?.avatar}
            />
            <Tooltip title='Upload a new image to update your avatar immediately.'>
              <Button
                component='label'
                variant='contained'
                size='small'
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type='file' onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant='h6'>{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>
              @{currentUser?.username}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box
            sx={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label='Your Email'
                type='text'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailIcon fontSize='small' />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label='Your Username'
                type='text'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountBoxIcon fontSize='small' />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label='Your Display Name'
                type='text'
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AssignmentIndIcon fontSize='small' />
                    </InputAdornment>
                  )
                }}
                {...register('displayName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <Button
                className='interceptor-loading'
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AccountTab
