import { isEmpty } from 'lodash'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { mapOrder } from '~/utils/sort'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatter'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )
    return response.data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      state.currentActiveBoard = board
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      const board = action.payload

      // Sắp xếp lại Columns trước khi sử dụng
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          // Nếu Column rỗng thì đặt vào nó một Placeholder Card giữ chỗ
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp lại Cards trước khi sử dụng
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })

      state.currentActiveBoard = board
    })
  }
})

export const { updateCurrentActiveBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export default activeBoardSlice.reducer
