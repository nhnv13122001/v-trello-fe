import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import Column from './Column/Column'
import { TextField, Tooltip } from '@mui/material'

function ListColumns({ columns }) {
  const [openForm, setOpenForm] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  return (
    // SortableContext yêu cầu items là một mảng dạng ['id-01', 'id-02'] chứ không phải [{id: 'id-01'}, {id: 'id-02'}]
    // Nếu không đúng quy tắc này thì Thư viện dnd-kit vẫn hoạt đồng nhưng không có animation
    // https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          height: '100%',
          paddingX: 2,
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            margin: 2
          }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {!openForm ? (
          <Box
            onClick={() => {
              setOpenForm(!openForm)
              setColumnTitle('')
            }}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              height: 'fit-content',
              borderRadius: '6px',
              backgroundColor: '#ffffff3d'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                justifyContent: 'flex-start',
                paddingX: 2.5,
                paddingY: 1,
                color: '#ffffff',
                width: '100%'
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: '250px',
              maxWidth: '250px',
              padding: 1.5,
              height: 'fit-content',
              borderRadius: '6px',
              backgroundColor: '#ffffff3d'
            }}
          >
            <TextField
              autoFocus
              label='Enter column title...'
              type='text'
              size='small'
              onChange={(e) => {
                setColumnTitle(e.target.value)
              }}
              value={columnTitle}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    placement='right'
                    title='Clear'
                    onClick={() => {
                      setColumnTitle('')
                    }}
                    sx={{
                      display: columnTitle || 'none',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </Tooltip>
                )
              }}
              sx={{
                '& label, & input, & label.Mui-focused': {
                  color: '#ffffff'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                    borderColor: '#ffffff'
                  }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                gap: 1
              }}
            >
              <Button
                size='small'
                variant='contained'
                onClick={() => {
                  if (!columnTitle) {
                    toast.error('Please enter Column Title!', {
                      position: 'bottom-left',
                      theme: 'colored'
                    })
                  } else {
                    toast.success('Add Column succesfully!', {
                      position: 'bottom-left',
                      theme: 'colored'
                    })
                    setOpenForm(!openForm)
                    setColumnTitle('')
                  }
                }}
                sx={{
                  color: '#ffffff',
                  '&, &:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
                  }
                }}
              >
                Add
              </Button>
              <Button
                size='small'
                variant='contained'
                onClick={() => {
                  setOpenForm(!openForm)
                  setColumnTitle('')
                }}
                sx={{
                  color: '#ffffff',
                  '&, &:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#c0392b' : '#e74c3c'
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
