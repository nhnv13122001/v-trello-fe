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
import { useConfirm } from 'material-ui-confirm'
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

import ListCards from './ListCards/ListCards'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { addCardAPI, deleteColumnAPI } from '~/apis'

function Column({ column }) {
  const dispatch = useDispatch()
  const confirmDeleteColumn = useConfirm()
  const [cardTitle, setCardTitle] = useState('')
  const [openForm, setOpenForm] = useState(false)
  const board = useSelector(selectCurrentActiveBoard)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const orderedCards = column?.cards
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

  const handleAddCard = async () => {
    if (!cardTitle) {
      toast.error('Please enter Card Title!', {
        position: 'bottom-right',
        theme: 'colored'
      })
    } else {
      const createdCard = await addCardAPI({
        title: cardTitle,
        columnId: column._id,
        boardId: board._id
      })
      const updatedBoard = cloneDeep(board)
      const columnToUpdate = updatedBoard.columns.find(
        (column) => createdCard.columnId === column._id
      )
      if (columnToUpdate) {
        if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
          columnToUpdate.cards = [createdCard]
          columnToUpdate.cardOrderIds = [createdCard._id]
        } else {
          columnToUpdate.cards.push(createdCard)
          columnToUpdate.cardOrderIds.push(createdCard._id)
        }
      }
      dispatch(updateCurrentActiveBoard(updatedBoard))

      toast.success('Add Card succesfully!', {
        position: 'bottom-right',
        theme: 'colored'
      })
      setOpenForm(!openForm)
      setCardTitle('')
    }
  }

  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column?',
      description:
        'This action will permanently delete your Column and its Cards! Are you sure?'
    })
      .then(() => {
        const updatedBoard = cloneDeep(board)
        updatedBoard.columns = updatedBoard.columns.filter(
          (c) => c._id !== column._id
        )
        updatedBoard.columnOrderIds = updatedBoard.columnOrderIds.filter(
          (_id) => _id !== column._id
        )
        dispatch(updateCurrentActiveBoard(updatedBoard))

        deleteColumnAPI(column._id).then((res) => {
          toast.success(res?.deleteResult, {
            position: 'bottom-left',
            theme: 'colored'
          })
        })
      })
      .catch(() => {})
  }

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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={() => {
                  setOpenForm(!openForm)
                }}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .addCardIcon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className='addCardIcon' fontSize='small' />
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

              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .deleteForeverIcon': {
                      color: 'warning.dark'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon
                    className='deleteForeverIcon'
                    fontSize='small'
                  />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
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
                data-no-dnd='true'
                autoFocus
                label='Enter card title...'
                type='text'
                size='small'
                onChange={(e) => {
                  setCardTitle(e.target.value)
                }}
                value={cardTitle}
                sx={{
                  '& input': {
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffffff' : '#212121',
                    borderRadius: '4px',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff'
                  },
                  '& label, & label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  }
                }}
              />
              <Button
                data-no-dnd='true'
                variant='contained'
                onClick={handleAddCard}
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
                data-no-dnd='true'
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
