import axios, { AxiosResponse } from 'axios'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import NextApp, { AppContext } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'

import makeStore, { RootState } from '../store'
import { theme } from '../theme'

import '../assets/styles/main.scss'

// Set up axios defaults
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.interceptors.response.use((response: AxiosResponse<any>) => response, (error: any) => {
    if (error.response && error.response.status && error.response.status === 401) {
        console.error('Your session has expired.')
    }
    return Promise.reject(error)
})

class App extends NextApp<ReduxWrapperAppProps<RootState>> {
    static async getInitialProps({ Component, ctx }: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props

        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        )
    }
}

export default withRedux(makeStore)(App)
