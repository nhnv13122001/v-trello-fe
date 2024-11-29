import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  currentUser: null
}

export const loginAPI = createAsyncThunk('user/loginAPI', async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/login`,
    data
  )
  return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      const user = action.payload

      state.currentUser = user
    })
  }
})

// export const {} = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export default userSlice.reducer
