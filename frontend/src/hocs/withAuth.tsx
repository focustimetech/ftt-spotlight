import axios, { AxiosResponse } from 'axios'
import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'
import { connect } from 'react-redux'

import { dispatchCurrentUser } from '../actions/authActions'
import { RootState } from '../store'
import { AccountType, IUser } from '../types/auth'
import API from '../utils/api'
import redirect from '../utils/redirect'

const accountMatchesWhitelist = (accountType: AccountType, whitelist: AccountType[]): boolean => {
    return whitelist.some((type: AccountType) => type === accountType)
}

interface IReduxProps {
    currentUser: IUser
    dispatchCurrentUser: () => Promise<void>
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T & IReduxProps> {
        static getInitialProps = async (context: NextPageContext) => {
            const { req, store } = context
            const isServer: boolean = typeof window === 'undefined'
            // console.log('isServer = ', isServer)
            // console.log('typeof window:', typeof window)
            // const cookie: string = isServer && req ? req.headers.cookie : null // Unused

            let user: IUser = store.getState().auth.user // Get him from the datastore
            console.log('Initial user:', user)

            if (!user) {
                await store.dispatch(dispatchCurrentUser()).then(() => {
                    // Get the just-fetched user from the datastore.
                    user = store.getState().auth.user
                    console.log('New user:', user)
                }, (error: any) => {
                    redirect('/login',  isServer ? context : undefined) // Couldn't verify using the user's cookie, send to login
                })
            }

            if (user && accountMatchesWhitelist(user.accountType, accountTypes)) {
                return
            }
            redirect('/', isServer ? context : undefined) // Account doesn't have the right access.
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }

    const mapStateToProps = (state: RootState) => ({
        currentUser: state.auth.user
    })

    const mapDispatchToProps = { dispatchCurrentUser }

    return connect(mapStateToProps, mapDispatchToProps)(AuthComponent)
}

export default withAuth
