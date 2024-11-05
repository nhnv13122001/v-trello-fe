import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import Column from './Column/Column'

function ListColumns({ columns }) {
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
    </SortableContext>
  )
}

export default ListColumns
