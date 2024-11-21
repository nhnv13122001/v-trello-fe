import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { toast } from 'react-toastify'
import { CSS } from '@dnd-kit/utilities'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Cloud from '@mui/icons-material/Cloud'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useSortable } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import AddCardIcon from '@mui/icons-material/AddCard'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { mapOrder } from '~/utils/sort'
import ListCards from './ListCards/ListCards'

function Column({ column }) {
  const [openForm, setOpenForm] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })
  const dndKitColumnStyle = {
    touchAction: 'none',
    // Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <Box ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          borderRadius: '6px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: (theme) => theme.trello.columnHeaderHeight,
            padding: 2
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <ListCards cards={orderedCards} />

        <Box
          sx={{
            padding: 2,
            height: (theme) => theme.trello.columnFooterHeight
          }}
        >
          {!openForm ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={() => {
                  setOpenForm(!openForm)
                }}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: '100%'
              }}
            >
              <TextField
                autoFocus
                label='Enter card title...'
                type='text'
                size='small'
                onChange={(e) => {
                  setCardTitle(e.target.value)
                }}
                value={cardTitle}
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      placement='right'
                      title='Clear'
                      onClick={() => {
                        setCardTitle('')
                      }}
                      sx={{
                        display: cardTitle || 'none',
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

              <Button
                variant='contained'
                onClick={() => {
                  if (!cardTitle) {
                    toast.error('Please enter Card Title!', {
                      position: 'bottom-right',
                      theme: 'colored'
                    })
                  } else {
                    console.log(cardTitle)
                    toast.success('Add Card succesfully!', {
                      position: 'bottom-right',
                      theme: 'colored'
                    })
                    setOpenForm(!openForm)
                    setCardTitle('')
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
                variant='contained'
                onClick={() => {
                  setOpenForm(!openForm)
                  setCardTitle('')
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
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Column
