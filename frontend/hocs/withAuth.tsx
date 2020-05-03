import React from 'react'

import { dispatchCurrentUser } from '../actions/authActions'
import { queueSnackbar } from '../actions/snackbarActions'
import { RootState } from '../store'
import { NextPageContext } from '../types'
import { AccountType, IUser } from '../types/auth'
import redirect from '../utils/redirect'

import Layout from '../components/Layout'
import { NextPage } from 'next'

const accountMatchesWhitelist = (accountType: AccountType, whitelist: AccountType[]): boolean => {
    if (whitelist.length === 0) {
        console.log('No whitelist.')
        return true
    }
    return whitelist.some((type: AccountType) => type === accountType)
}

interface IAuthComponentProps {
    user: IUser
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: NextPage<T>) => {
    const AuthComponent: NextPage<T & IAuthComponentProps> = (props: T & IAuthComponentProps) => {
        return (
            <C {...props} />
        )
    }

    AuthComponent.getInitialProps = async (context: NextPageContext): Promise<T & IAuthComponentProps> => {
        const pageProps = C.getInitialProps ? await C.getInitialProps(context) : {}

        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        let user: IUser = store.getState().auth.user // Get him from the datastore
        let authValid: boolean = true
        console.log('Initial user:', user)

        if (!user) {
            console.log('Fetching new user')
            await store.dispatch(dispatchCurrentUser()).then(() => {
                // Get the just-fetched user from the datastore.
                user = store.getState().auth.user
                console.log('New user:', user)
            }, (error: any) => {
                authValid = false
            })
            console.log('Done fetching')
        }

        if (user && accountMatchesWhitelist(user.accountType, accountTypes)) {
            return { ...pageProps, user }
        }

        if (!authValid) {
            console.log('auth invalid')
            // Couldn't verify using the user's cookie, send to login
            redirect('/login',  isServer ? context : undefined)
            store.dispatch(queueSnackbar({
                message: 'Your session has expired. Please sign back in.'
            }))

            return {...pageProps, user: undefined }
        }

        redirect('/', isServer ? context : undefined) // Account doesn't have the right access.
        return {...pageProps, user: undefined }
    }

    return (AuthComponent)
}

export default withAuth
