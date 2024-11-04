import Box from '@mui/material/Box'

import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        paddingX: '5px',
        marginX: '5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.trello.columnHeaderHeight} - 
        ${theme.trello.columnFooterHeight}
      )`,
        '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
      }}
    >
      {cards.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  )
}

export default ListCards