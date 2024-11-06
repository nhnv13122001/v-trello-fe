import { cloneDeep } from 'lodash'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  useSensor,
  DndContext,
  useSensors,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners
} from '@dnd-kit/core'

import { mapOrder } from '~/utils/sort'
import Column from './ListColumns/Column/Column'
import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumn] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumn((prev) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )

        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prev)
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        )

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn?.cards?.filter(
            (card) => card._id !== activeDraggingCardId
          )
          nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map(
            (card) => card._id
          )
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn?.cards?.filter(
            (card) => card._id !== activeDraggingCardId
          )
          nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )
          nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(
            (card) => card._id
          )
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card) => card._id === active.id
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === over.id
        )
        setOrderedColumn((prev) => {
          const nextColumns = cloneDeep(prev)
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          )

          targetColumn.cards = arrayMove(
            oldColumnWhenDraggingCard?.cards,
            oldCardIndex,
            newCardIndex
          )
          targetColumn.cardOrderIds = arrayMove(
            oldColumnWhenDraggingCard?.cards,
            oldCardIndex,
            newCardIndex
          ).map((card) => card._id)

          return nextColumns
        })
      }
    }

    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      )
      const newColumnIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      )
      setOrderedColumn((orderedColumns) => {
        return arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      })
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
        <DragOverlay>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
