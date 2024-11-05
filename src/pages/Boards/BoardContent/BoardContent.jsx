import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { mapOrder } from '~/utils/sort'
import ListColumns from './ListColumns/ListColumns'

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumn] = useState([])
  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event
    console.log('🚀 ~ handleDragEnd ~ event:', event)

    // Dủng arrayMove để sắp xếp lại mảng Columns ban đầu
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      )
      const newIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      )
      setOrderedColumn((orderedColumns) => {
        return arrayMove(orderedColumns, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          padding: '10px 0',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
