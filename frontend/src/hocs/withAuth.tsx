import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'
import connect, { useDispatch, useSelector } from 'react-redux'

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

const withAuth = <T extends object>(C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T> {
        static async getInitialProps(context: NextPageContext) {
            const currentUser = useSelector((state) => state.auth.currentUser)

            return {}
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
