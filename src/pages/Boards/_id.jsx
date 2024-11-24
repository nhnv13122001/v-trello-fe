import { isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { mapOrder } from '~/utils/sort'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import {
  addNewCardAPI,
  addNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardsToDifferentColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6737fed60d600568968a2d68'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const addNewColumn = async (newColumnData) => {
    const createdColumn = await addNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const addNewCard = async (newCardData) => {
    const createdCard = await addNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => createdCard.columnId === column._id
    )
    columnToUpdate.cards.push(createdCard)
    columnToUpdate.cardOrderIds.push(createdCard._id)
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardDetailsAPI(board._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  const moveCardsInSameColumn = async (
    dndOrderedCards,
    dndOrderedCardsIds,
    columnId
  ) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    setBoard(newBoard)

    await updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardsIds
    })
  }

  const moveCardsToDifferentColumn = async (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    moveCardsToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(
        (column) => column._id === prevColumnId
      )?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (column) => column._id === nextColumnId
      )?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          height: '100vh',
          width: '100vw'
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        addNewColumn={addNewColumn}
        addNewCard={addNewCard}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardsToDifferentColumn={moveCardsToDifferentColumn}
      />
    </Container>
  )
}

export default Board
