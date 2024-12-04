import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import activeCardReducer from './activeCard/activeCardSlice'
import activeBoardReducer from './activeBoard/activeBoardSlice'
import notificationsReducer from './notifications/notificationsSlice'

const rootPersistConfig = {
  key: 'root',
  storage, // Biến storage ở trên, lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slice dữ liệu Được phép duy trì sau mỗi lần F5
}

const reducer = combineReducers({
  user: userReducer,
  activeCard: activeCardReducer,
  activeBoard: activeBoardReducer,
  notifications: notificationsReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
