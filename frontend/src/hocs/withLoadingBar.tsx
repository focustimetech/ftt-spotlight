import Router from 'next/router'
import nprogress from 'nprogress'
import React from 'react'

const withLoadingBar = <T extends object>(C: React.ComponentType<T>) => {
    return class Component extends React.Component<T> {
        componentDidMount() {
            Router.events.on('routeChangeStart', () => nprogress.start())
            Router.events.on('routeChangeComplete', () => nprogress.done())
            Router.events.on('routeChangeError', () => nprogress.done())
        }

        componentWillUnmount() {
            Router.events.off('routeChangeStart', () => nprogress.start())
            Router.events.off('routeChangeComplete', () => nprogress.done())
            Router.events.off('routeChangeError', () => nprogress.done())
        }

        render() {
            return (
                <>
                    <C {...this.props} />
                </>
            )
        }
    }
}

export default withLoadingBar
