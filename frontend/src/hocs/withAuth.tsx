import React from 'react'

import { dispatchCurrentUser } from '../actions/authActions'
import { RootState } from '../store'
import { NextPageContext } from '../types'
import { AccountType, IUser } from '../types/auth'
import redirect from '../utils/redirect'

const accountMatchesWhitelist = (accountType: AccountType, whitelist: AccountType[]): boolean => {
    return whitelist.some((type: AccountType) => type === accountType)
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T> {
        static getInitialProps = async (context: NextPageContext) => {
            const { store } = context
            const isServer: boolean = typeof window === 'undefined'
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

    return (AuthComponent)
}

export default withAuth
