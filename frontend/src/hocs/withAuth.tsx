import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'

import cookieParser from '../utils/cookieParser'
import redirect from '../utils/redirect'

/**
 * @TODO Move this to .env
 */
const SESSION_COOKIE_NAME: string = 'spotlight_session'

const withAuth = <T extends object>(C: React.ComponentType<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(context: NextPageContext) {
            const sessionCookie: string = context.req
                ? cookieParser(context.req.headers.cookie)[SESSION_COOKIE_NAME]
                : cookies.get(SESSION_COOKIE_NAME)

            if (!sessionCookie) {
                redirect(context, 'login')
            }

            return {}
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }
}

export default withAuth
