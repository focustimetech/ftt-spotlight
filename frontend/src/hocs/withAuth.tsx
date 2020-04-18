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

const validateAccountTypes = (accountType: AccountType, accountTypes: AccountType[]): boolean => {
    return accountTypes.some((type: AccountType) => type === accountType)
}

interface IReduxProps {
    currentUser: IUser
    dispatchCurrentUser: () => Promise<void>
}

const withAuth = <T extends object>(...accountTypes: AccountType[]) => (C: React.ComponentType<T>) => {
    class AuthComponent extends React.Component<T & IReduxProps> {
        static getInitialProps = async (context: NextPageContext) => {
            const { isServer, req } = context
            const cookie: string = isServer && req ? req.headers.cookie : null // cookies()
            const config = { headers: { Cookie: cookie } }

            // console.log('with cookie:', cookie)

            if (isServer) {
                await API.get('/user', config).then((res: AxiosResponse<IUser>) => {
                    if (validateAccountTypes(res.data.accountType, accountTypes)) {
                        return
                    }

                    redirect('/', context)
                }, (error: any) => {
                    redirect('/login', context)
                })
            } else {
                
                // await dispatchCurrentUser().then((res) => {
                // })
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
