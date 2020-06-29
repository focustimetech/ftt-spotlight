import Error from 'next/error'
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
        return true
    }
    return whitelist.some((type: AccountType) => type === accountType)
}

interface IAuthComponentProps {
    user: IUser
    statusCode?: number
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: NextPage<T> & { getLayout?: (node: React.ReactNode) => React.ReactNode }) => {
    const AuthComponent: NextPage<T & IAuthComponentProps> & { getLayout?: (node: React.ReactNode) => React.ReactNode } = (props: T & IAuthComponentProps) => {
        return props.statusCode ? (
            <Error statusCode={props.statusCode} />
        ) : (
            <C {...props} />
        )
    }

    AuthComponent.getLayout = C.getLayout

    AuthComponent.getInitialProps = async (context: NextPageContext): Promise<T & IAuthComponentProps> => {
        console.log('withAuth.getInitialProps')
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        let user: IUser = store.getState().auth.user // Get him from the datastore
        let authValid: boolean = true
        console.log('withAuth.initial_user:', user)

        if (!user) {
            await store.dispatch(dispatchCurrentUser()).then(() => {
                // Get the just-fetched user from the datastore.
                user = store.getState().auth.user
                console.log('withAuth.new_user:', user)
            }, (error: any) => {
                authValid = false
                console.log('withAuth.authValid = false')
            })
        }

        if (!authValid) {
            console.log('auth invalid')
            // Couldn't verify using the user's cookie, send to login
            redirect('/login',  isServer ? context : undefined)
            store.dispatch(queueSnackbar({
                message: 'Your session has expired. Please sign back in.'
            }))

            return { user: undefined }
        }

        const pageProps = C.getInitialProps ? await C.getInitialProps(context) : {}
        if (user && accountMatchesWhitelist(user.accountType, accountTypes) && user.active) {
            return { ...pageProps, user }
        }

        if (!user.active) {
            // User hasn't finished setting up their account; Redirect to welcome
            redirect('/welcome',  isServer ? context : undefined)
            return {...pageProps, user: undefined }
        }

        // Account doesn't have the right access.
        if (isServer) {
            context.res.writeHead(403)
            context.res.end()
            return
        } else {
            redirect('/')
        }
        return {...pageProps, user: undefined }
    }

    return (AuthComponent)
}

export default withAuth
