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
            const { isServer, req, store } = context
            const cookie: string = isServer && req ? req.headers.cookie : null

            // Set axios headers
            axios.defaults.headers = req.headers

            store.dispatch(dispatchCurrentUser()).then((res: AxiosResponse<IUser>) => {
                console.log('USER got:', res.data)
                if (accountMatchesWhitelist(res.data.accountType, accountTypes)) {
                    return
                }
                redirect('/', context)
            }, (error: any) => {
                console.log('Failed to get USER, probably 401')
                redirect('/login', context)
            })

            /*
            if (isServer) {
                await API.get('/user', config).then((res: AxiosResponse<IUser>) => {
                    console.log('USER got:', res.data)
                    if (accountMatchesWhitelist(res.data.accountType, accountTypes)) {
                        return
                    }
                    redirect('/', context)
                }, (error: any) => {
                    redirect('/login', context)
                })
            }
            */
        }

        componentDidMount() {
            if (!this.props.currentUser) {
                // redirect('/login') // Add this back in later
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
