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
    return class AuthComponent extends React.Component<T> {
        static getInitialProps = async (context: NextPageContext) => {
            API.get('/user').then((res: AxiosResponse<IUser>) => {
                accountTypes.forEach((accountType: AccountType) => {
                    if (accountType === res.data.accountType) {
                        return context
                    }
                })
            }, (error: any) => {
                console.error('Could not get current user.', error)
                //redirect('login', context)
                return context
            })

            console.error('User not permitted.')
            //redirect('/', context)
        }

        render() {
            return (
                <C {...this.props} />
            )
        }
    }
}

export default withAuth
