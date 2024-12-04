import React from 'react'
import { io } from 'socket.io-client'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { persistStore } from 'redux-persist'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ConfirmProvider } from 'material-ui-confirm'
import { PersistGate } from 'redux-persist/integration/react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import App from '~/App.jsx'
import theme from '~/theme'
import { store } from '~/redux/store'
import { API_ROOT } from './utils/constants'
import { injectStore } from '~/utils/authorizeAxios'

const persistor = persistStore(store)

injectStore(store)

export const socketIoInstance = io(API_ROOT)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <React.StrictMode>
          <CssVarsProvider theme={theme}>
            <ConfirmProvider>
              <GlobalStyles
                styles={{
                  a: {
                    textDecoration: 'none'
                  }
                }}
              />
              <CssBaseline />
              <App />
              <ToastContainer theme='colored' />
            </ConfirmProvider>
          </CssVarsProvider>
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
