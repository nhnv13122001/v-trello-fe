import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns() {
  return (
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
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />

      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
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
    </Box>
  )
}

export default ListColumns
