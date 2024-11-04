import Container from '@mui/material/Container'

import BoardBar from './BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board
