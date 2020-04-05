import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'
import connect from 'react-redux'

import cookieParser from '../utils/cookieParser'
import redirect from '../utils/redirect'

/**
 * @TODO Move this to .env
 */
const SESSION_COOKIE_NAME: string = 'spotlight_session'

interface IReduxProps {
    currentUser: any
    fetchCurrentUser: () => Promise<void>
}

const withAuth = <T extends IReduxProps>(C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T> {
        static async getInitialProps(context: NextPageContext) {
            const sessionCookie: string = context.req
                ? cookieParser(context.req.headers.cookie)[SESSION_COOKIE_NAME]
                : cookies.get(SESSION_COOKIE_NAME)

            if (!sessionCookie) {
                redirect('login', context)
            }

            return {}
        }

        componentDidMount() {
            if (!this.props.currentUser) {
                this.props.fetchCurrentUser().catch(() => {
                    redirect('login')
                })
            }
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthComponent)
}

export default withAuth
