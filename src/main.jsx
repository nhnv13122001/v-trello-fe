import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { persistStore } from 'redux-persist'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'
import { PersistGate } from 'redux-persist/integration/react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import App from '~/App.jsx'
import theme from '~/theme'
import { store } from '~/redux/store'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <CssVarsProvider theme={theme}>
            <ConfirmProvider>
              <CssBaseline />
              <App />
              <ToastContainer theme='colored' />
            </ConfirmProvider>
          </CssVarsProvider>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
