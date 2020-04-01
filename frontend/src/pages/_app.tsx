import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'

import { store } from '../store'
import { theme } from '../theme'

import '../assets/styles/main.scss'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

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
