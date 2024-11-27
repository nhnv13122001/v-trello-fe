import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'

import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { generatePlaceholderCard } from '~/utils/formatter'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import {
  addNewCardAPI,
  addNewColumnAPI,
  updateBoardDetailsAPI,
  deleteColumnDetailsAPI,
  updateColumnDetailsAPI,
  moveCardsToDifferentColumnAPI
} from '~/apis'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    const boardId = '6737fed60d600568968a2d68'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  const addNewColumn = async (newColumnData) => {
    const createdColumn = await addNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const updatedBoard = cloneDeep(board)
    updatedBoard.columns.push(createdColumn)
    updatedBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(updatedBoard))
  }

  const addNewCard = async (newCardData) => {
    const createdCard = await addNewCardAPI({
      ...newCardData,
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
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    await updateBoardDetailsAPI(board._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  const moveCardsInSameColumn = async (
    dndOrderedCards,
    dndOrderedCardsIds,
    columnId
  ) => {
    const updatedBoard = cloneDeep(board)
    const columnToUpdate = updatedBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    dispatch(updateCurrentActiveBoard(updatedBoard))

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
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    let prevCardOrderIds = dndOrderedColumns.find(
      (column) => column._id === prevColumnId
    )?.cardOrderIds
    if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []

    await moveCardsToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (column) => column._id === nextColumnId
      )?.cardOrderIds
    })
  }

  const deleteColumnDetails = async (columnId) => {
    const updatedBoard = cloneDeep(board)
    updatedBoard.columns = updatedBoard.columns.filter(
      (column) => column._id !== columnId
    )
    updatedBoard.columnOrderIds = updatedBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    )
    dispatch(updateCurrentActiveBoard(updatedBoard))

    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult, {
        position: 'bottom-left',
        theme: 'colored'
      })
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
        deleteColumnDetails={deleteColumnDetails}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardsToDifferentColumn={moveCardsToDifferentColumn}
      />
    </Container>
  )
}

export default Board
