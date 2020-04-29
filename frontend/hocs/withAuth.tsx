import React from 'react'

import { dispatchCurrentUser } from '../actions/authActions'
import { queueSnackbar } from '../actions/snackbarActions'
import { RootState } from '../store'
import { NextPageContext } from '../types'
import { AccountType, IUser } from '../types/auth'
import redirect from '../utils/redirect'

const accountMatchesWhitelist = (accountType: AccountType, whitelist: AccountType[]): boolean => {
    if (whitelist.length === 0) {
        console.log('No whitelist.')
        return true
    }
    return whitelist.some((type: AccountType) => type === accountType)
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T> {
        static getInitialProps = async (context: NextPageContext) => {
            const { store } = context
            const isServer: boolean = typeof window === 'undefined'
            let user: IUser = store.getState().auth.user // Get him from the datastore
            let authValid: boolean = true
            console.log('Initial user:', user)

            if (!user) {
                await store.dispatch(dispatchCurrentUser()).then(() => {
                    // Get the just-fetched user from the datastore.
                    user = store.getState().auth.user
                    console.log('New user:', user)
                }, (error: any) => {
                    authValid = false
                })
            }

            if (user && accountMatchesWhitelist(user.accountType, accountTypes)) {
                return
            }

            if (!authValid) {
                // Couldn't verify using the user's cookie, send to login
                redirect('/login',  isServer ? context : undefined)
                if (!isServer) {
                    store.dispatch(queueSnackbar({
                        message: 'Your session has expired. Please sign back in.'
                    }))
                }
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

    return (AuthComponent)
}

export default withAuth
