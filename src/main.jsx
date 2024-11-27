import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import App from '~/App.jsx'
import theme from '~/theme'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <App />
          <ToastContainer />
        </ConfirmProvider>
      </CssVarsProvider>
    </React.StrictMode>
  </Provider>
)
