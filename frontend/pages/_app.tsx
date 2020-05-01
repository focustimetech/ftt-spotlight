// note: This library is being depricated
// import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'


import NextApp, { AppContext } from 'next/app'
import React from 'react'
import { connect, Provider } from 'react-redux'

// Material UI components
import { ThemeProvider } from '@material-ui/styles'

// Providers, style, static assets
import 'nprogress/nprogress.css'
import '../assets/styles/main.scss'

import withLoadingBar from '../hocs/withLoadingBar'
import withReduxStore from '../hocs/withReduxStore'
import { theme } from '../theme'

// Actions, utils
import { axios } from '../utils/api'

// Components
import SnackbarProvider from '../components/SnackbarProvider'

class App extends NextApp {
    static async getInitialProps({ Component, ctx }: AppContext) {
        if (ctx.req) {
            axios.defaults.headers['Cookie'] = ctx.req.headers.cookie
            axios.defaults.headers['Date'] = '1999-01-19T00:00:00'
        }
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

export default withReduxStore(withLoadingBar(App))
