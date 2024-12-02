import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import AbcIcon from '@mui/icons-material/Abc'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm, Controller } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import FormControlLabel from '@mui/material/FormControlLabel'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

import { addBoardAPI } from '~/apis'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

function SidebarCreateBoardModal({ afterAddBoard }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => {
    setIsOpen(false)

    reset()
  }

  const submitCreateNewBoard = (data) => {
    const { title, description, type } = data
    addBoardAPI({ title, description, type }).then(() => {
      handleCloseModal()
      afterAddBoard()
    })
  }

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize='small' />
        Create a new board
      </SidebarItem>

      <Modal
        open={isOpen}
        // chỉ sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
        // onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: '8px',
            border: 'none',
            outline: 0,
            padding: '20px 30px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : 'white'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
          >
            <CancelIcon
              color='error'
              sx={{ '&:hover': { color: 'error.light' } }}
              onClick={handleCloseModal}
            />
          </Box>
          <Box
            id='modal-modal-title'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <LibraryAddIcon />
            <Typography variant='h6' component='h2'>
              Create a new board
            </Typography>
          </Box>
          <Box id='modal-modal-description' sx={{ marginY: 2 }}>
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label='Title'
                    type='text'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AbcIcon fontSize='small' />
                        </InputAdornment>
                      )
                    }}
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: 'Min Length is 3 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Max Length is 50 characters'
                      }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label='Description'
                    type='text'
                    variant='outlined'
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <DescriptionOutlinedIcon fontSize='small' />
                        </InputAdornment>
                      )
                    }}
                    {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: 'Min Length is 3 characters'
                      },
                      maxLength: {
                        value: 255,
                        message: 'Max Length is 255 characters'
                      }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                {/*
                 * RadioGroup của MUI thì không thể dùng register tương tự TextField được
                 * mà phải sử dụng <Controller /> và props "control" của react-hook-form như cách làm dưới đây
                 * https://stackoverflow.com/a/73336101
                 * https://mui.com/material-ui/react-radio-button/
                 */}
                <Controller
                  name='type'
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(event, value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size='small' />}
                        label='Public'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size='small' />}
                        label='Private'
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  )}
                />

                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    className='interceptor-loading'
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SidebarCreateBoardModal