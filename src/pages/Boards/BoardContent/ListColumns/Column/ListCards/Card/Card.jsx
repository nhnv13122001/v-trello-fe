import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  return temporaryHideMedia ? (
    <MuiCard
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
        <Typography>Vinnek</Typography>
      </CardContent>
    </MuiCard>
  ) : (
    <MuiCard
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
    </MuiCard>
  )
}

export default Card
