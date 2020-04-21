import { NextPageContext } from 'next'
import React from 'react'

import { axios } from '../utils/api'

const withRequestHeaders = <T extends object>(C: React.ComponentType<T>) => {
    return class Component extends React.Component<T & { headers: any }> {
        static getInitialProps = async (context: NextPageContext) => {
            const headers = context.req ? context.req.headers : undefined

            if (headers) {
                axios.defaults.headers = headers
            }
            return { headers }
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }
}

export default withRequestHeaders
