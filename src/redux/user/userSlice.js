import { toast } from 'react-toastify'
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

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/users/update`,
      data
    )
    return response.data
  }
)

export const logoutAPI = createAsyncThunk(
  'user/logoutAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(
      `${API_ROOT}/v1/users/logout`
    )
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      const user = action.payload

      state.currentUser = user
    })
    builder.addCase(logoutAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
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
