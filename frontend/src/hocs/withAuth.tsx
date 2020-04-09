import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'
import { connect } from 'react-redux'

import { dispatchCurrentUser } from '../actions/authActions'
import { RootState } from '../store'
import { IUser } from '../types/auth'
import redirect from '../utils/redirect'

const withAuth = <T extends object>(C: React.ComponentType<T>) => {
    const AuthComponent = (props: any) => {
        return (
            <C {...props} />
        )
    }

    AuthComponent.getInitialProps = async (context: NextPageContext) => {
        const { store, isServer } = context
        const state: RootState = store.getState()
        const currentUser: IUser = state.auth.user

        if (!currentUser) {
            store.dispatch(dispatchCurrentUser()).then(() => null, (error: any) => {
                console.log('User is not authenticated.')
                // Here, user is redirected.
            })
        }

        return { isServer }
    }

    return connect((state: RootState) => state.auth.user, {dispatchCurrentUser})(AuthComponent)
}

export default withAuth
