import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'

import { Provider } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'

import { store } from '../store'
import { theme } from '../theme'
import { setAuthorizationToken, setJsonHeaders } from '../utils/api'
import { ACCESS_TOKEN } from '../utils/storage'

import '../assets/styles/main.scss'
axios.defaults.withCredentials = true

// setAuthorizationToken(localStorage.getItem(ACCESS_TOKEN))
// setJsonHeaders()

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ThemeProvider>
    )
}

export default App
