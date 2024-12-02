import randomColor from 'randomcolor'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import CardContent from '@mui/material/CardContent'
import { Link, useLocation } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'

import { fetchBoardsAPI } from '~/apis'
import SidebarCreateBoardModal from './create'
import AppBar from '~/components/AppBar/AppBar'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function Boards() {
  const location = useLocation()
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)

  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    // fetchBoardsAPI(location.search).then((res) => {
    //   updateStateData(res)
    // })
    fetchBoardsAPI(location.search).then(updateStateData)
  }, [location.search])

  const afterAddBoard = () => {
    fetchBoardsAPI(location.search).then(updateStateData)
  }

  if (!boards) {
    return <PageLoadingSpinner caption='Loading Boards...' />
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, marginY: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Stack direction='column' spacing={1}>
              <SidebarItem className='active'>
                <SpaceDashboardIcon fontSize='small' />
                Boards
              </SidebarItem>
              <SidebarItem>
                <ListAltIcon fontSize='small' />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize='small' />
                Home
              </SidebarItem>
            </Stack>
            <Divider sx={{ marginY: 1 }} />
            <Stack direction='column' spacing={1}>
              <SidebarCreateBoardModal afterAddBoard={afterAddBoard} />
            </Stack>
          </Grid>

          <Grid xs={12} sm={9}>
            <Typography
              variant='h4'
              sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
              Your boards:
            </Typography>

            {boards?.length === 0 && (
              <Typography
                variant='span'
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
              >
                No result found!
              </Typography>
            )}

            {boards?.length > 0 && (
              <Grid container spacing={2}>
                {boards.map((b) => (
                  <Grid xs={2} sm={3} md={4} key={b._id}>
                    <Card sx={{ width: '250px' }}>
                      {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board */}
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box
                        sx={{ height: '50px', backgroundColor: randomColor() }}
                      ></Box>

                      <CardContent
                        sx={{ padding: 1.5, '&:last-child': { padding: 1.5 } }}
                      >
                        <Typography gutterBottom variant='h6' component='div'>
                          {b.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {b.description}
                        </Typography>
                        <Box
                          component={Link}
                          to={`/boards/${b._id}`}
                          sx={{
                            marginTop: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            color: 'primary.main',
                            '&:hover': { color: 'primary.light' }
                          }}
                        >
                          Go to board
                          <ArrowRightIcon fontSize='small' />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {totalBoards > 0 && (
              <Box
                sx={{
                  marginY: 3,
                  paddingRight: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <Pagination
                  size='large'
                  color='secondary'
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${
                        item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`
                      }`}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
