import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import BoardBar from './BoardBar/BoardBar'
import { fetchBoardDetailsAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6737fed60d600568968a2d68'
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
  }, [])

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
