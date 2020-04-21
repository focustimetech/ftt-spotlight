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
            console.log('isServer = ', isServer)
            console.log('typeof window:', typeof window)
            // const cookie: string = isServer && req ? req.headers.cookie : null // Unused
            let user: IUser = null // Get him from the datastore
            // Set axios headers
            // axios.defaults.headers = req.headers

            if (isServer) {
                store.dispatch(dispatchCurrentUser()).then(() => {
                    user = null // Get the just-fetched user from the datastore.
                    if (accountMatchesWhitelist(user.accountType, accountTypes)) {
                        return
                    }
                    redirect('/', context) // Account doesn't have the right access.
                }, (error: any) => {
                    console.log('Failed to get USER, probably 401')
                    redirect('/login', context) // Couldn't verify using the user's cookie, send to login
                })
            } else {
                if (!user) {
                    redirect('/login')
                }
            }
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
