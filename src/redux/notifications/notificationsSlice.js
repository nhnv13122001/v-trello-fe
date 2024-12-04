import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/invitations`
    )
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationsAPI',
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${invitationId}`,
      { status }
    )
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      state.currentNotifications.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      state.currentNotifications = Array.isArray(incomingInvitations)
        ? incomingInvitations.reverse()
        : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload

      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      )
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

export default notificationsSlice.reducer
