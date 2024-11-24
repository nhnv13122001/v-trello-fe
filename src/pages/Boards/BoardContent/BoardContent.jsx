import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useSensor,
  DndContext,
  useSensors,
  DragOverlay,
  pointerWithin,
  closestCorners,
  getFirstCollision
} from '@dnd-kit/core'

import Column from './ListColumns/Column/Column'
import ListColumns from './ListColumns/ListColumns'
import { generatePlaceholderCard } from '~/utils/formatter'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { MouseSensor, TouchSensor } from '~/customLibraries/MySensor'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  addNewColumn,
  addNewCard,
  moveColumns,
  moveCardsInSameColumn
}) {
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

  const [orderedColumns, setOrderedColumn] = useState([])
  // const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)
  const lastOverId = useRef(null)

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  const moveCardToTheDiffCard = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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

        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

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
          {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }
        )
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        )

        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(
          (card) => card._id
        )
      }

      return nextColumns
    })
  }

  useEffect(() => {
    setOrderedColumn(board?.columns)
  }, [board])

  const handleDragStart = (event) => {
    // setActiveDragItemId(event?.active?.id)
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
      moveCardToTheDiffCard(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardToTheDiffCard(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
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

        moveCardsInSameColumn(
          arrayMove(
            oldColumnWhenDraggingCard?.cards,
            oldCardIndex,
            newCardIndex
          ),
          arrayMove(
            oldColumnWhenDraggingCard?.cards,
            oldCardIndex,
            newCardIndex
          ).map((card) => card._id),
          oldColumnWhenDraggingCard._id
        )
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
      moveColumns(arrayMove(orderedColumns, oldColumnIndex, newColumnIndex))
    }

    // setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return

      // Đoạn này fix bug flickering khi card nằm giữa 2 column
      // Tuy nhiên vẫn bị flickering khi đưa card lên cao (out of column range)
      // Chiều cao của column không phải 100vh => Đưa card lên phần Board bar và App bar vẫn sẽ bị flickering
      // Solution: Không bắt sự kiện khi đưa column out of range
      // const intersections =
      //   pointerIntersections.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args)

      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        )
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
        <ListColumns
          columns={orderedColumns}
          addNewColumn={addNewColumn}
          addNewCard={addNewCard}
        />
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
