import axios, { AxiosResponse } from 'axios'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import NextApp, { AppContext } from 'next/app'
import React from 'react'
import { connect, Provider } from 'react-redux'

// material-ui
import { ThemeProvider } from '@material-ui/styles'

// Providers, style, static assets
import '../assets/styles/main.scss'
import makeStore, { RootState } from '../store'
import { theme } from '../theme'

// Actions, utils
import { queueSnackbar } from '../actions/snackbarActions'

// Components
import SnackbarProvider from '../components/SnackbarProvider'

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
                    <>
                        <Component {...pageProps} />
                        <SnackbarProvider />
                    </>
                </Provider>
            </ThemeProvider>
        )
    }
}

export default withRedux(makeStore)(App)
