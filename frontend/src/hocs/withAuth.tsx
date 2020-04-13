import { AxiosResponse } from 'axios'
import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import React from 'react'
import { connect } from 'react-redux'

import { dispatchCurrentUser } from '../actions/authActions'
import { RootState } from '../store'
import { AccountType, IUser } from '../types/auth'
import API from '../utils/api'
import redirect from '../utils/redirect'

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: React.ComponentType<T>) => {
    console.log('Rendering withAuth:', accountTypes)
    return class AuthComponent extends React.Component<T> {
        static getInitialProps = async (context: NextPageContext) => {
            const { isServer, req } = context
            const cookie: string = isServer && req ? req.headers.cookie : null // cookies()
            API.get('/user', { headers: { Cookie: cookie } }).then((res: AxiosResponse<IUser>) => {
                console.log('Successfully hit /user')
                console.log('res.data:', res.data)
                const allowAccess: boolean = accountTypes.some((accountType: AccountType) => {
                    return accountType === res.data.accountType
                })
                if (allowAccess) {
                    return
                }

                console.log('Redirecting to slash')
                redirect('/', context)
            }, (error: any) => {
                if (isServer) {
                    redirect('/login', context)
                }
            })
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }
}

export default withAuth
