import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ card }) {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px #0000004d',
        overflow: 'unset'
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card?.title}
        />
      )}

      <CardContent
        sx={{
          '&, &:last-child': {
            padding: 1.5
          }
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {(!!card?.memberIds?.length ||
        !!card?.comments?.length ||
        !!card?.attachments?.length) && (
        <CardActions
          sx={{
            padding: '0 4px 8px'
          }}
        >
          {!!card?.memberIds?.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size='small' startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size='small' startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
