import React from 'react'

import Layout from '../components/Layout'
import HorizontalNav from '../components/Nav/HorizontalNav'

/**
 * A simple Higher Order Component used to add an unauthenticated navigation bar to pages.
 */
const withNavigation = <T extends object>(C: React.ComponentType<T>) => {
    return class Component extends React.Component<T> {
        render() {
            return (
                <Layout>
                    <HorizontalNav />
                    <C {...this.props} />
                </Layout>
            )
        }
    }
}

export default withNavigation
