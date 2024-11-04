import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Cloud from '@mui/icons-material/Cloud'
import MenuItem from '@mui/material/MenuItem'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import AddCardIcon from '@mui/icons-material/AddCard'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        padding: '10px 0',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
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
        <Box
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
              height: COLUMN_HEADER_HEIGHT,
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
              Column Title
            </Typography>
            <Box>
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id='basic-column-dropdown'
                  aria-controls={
                    open ? 'basic-menu-column-dropdown' : undefined
                  }
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

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              paddingX: '5px',
              marginX: '5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} - 
              ${COLUMN_FOOTER_HEIGHT}
            )`,
              '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image='https://images.unsplash.com/photo-1481988535861-271139e06469?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                title='green iguana'
              />
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Vinnek</Typography>
              </CardContent>
              <CardActions
                sx={{
                  padding: '0 4px 8px'
                }}
              >
                <Button size='small' startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size='small' startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size='small' startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: COLUMN_FOOTER_HEIGHT,
              padding: 2
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box
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
              height: COLUMN_HEADER_HEIGHT,
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
              Column Title
            </Typography>
            <Box>
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id='basic-column-dropdown'
                  aria-controls={
                    open ? 'basic-menu-column-dropdown' : undefined
                  }
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

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              paddingX: '5px',
              marginX: '5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} - 
              ${COLUMN_FOOTER_HEIGHT}
            )`,
              '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image='https://images.unsplash.com/photo-1481988535861-271139e06469?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                title='green iguana'
              />
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Vinnek</Typography>
              </CardContent>
              <CardActions
                sx={{
                  padding: '0 4px 8px'
                }}
              >
                <Button size='small' startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size='small' startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size='small' startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px #0000004d',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  '&, &:last-child': {
                    padding: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: COLUMN_FOOTER_HEIGHT,
              padding: 2
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
