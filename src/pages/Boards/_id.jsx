import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'

import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardsToDifferentColumnAPI
} from '~/apis'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function Board() {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const board = useSelector(selectCurrentActiveBoard)
  const activeCard = useSelector(selectCurrentActiveCard)

  useEffect(() => {
    // const boardId = '6737fed60d600568968a2d68'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

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

  if (!board) {
    return <PageLoadingSpinner caption='Loading Board...' />
  }
  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }}>
      {activeCard && <ActiveCard />}
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardsToDifferentColumn={moveCardsToDifferentColumn}
      />
    </Container>
  )
}

export default Board
