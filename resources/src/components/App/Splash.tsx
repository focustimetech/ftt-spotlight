import * as React from 'react'
import { CircularProgress } from '@material-ui/core';

import ChangePasswordWidget from '../Modals/ChangePasswordWidget'
import LoadingBadge from './LoadingBadge'

interface IProps {
    passwordExpired: boolean
    username?: string
    onChangePassword: () => void
    onSignOut: () => void
}

export const Splash = (props: IProps) => {
    return (
        <div className='splash' id='splash'>
            <div className='splash__content'>
                {props.passwordExpired ? (
                    <ChangePasswordWidget
                        isRequiredChange
                        disallowed={[props.username]}
                        variant='persistant'
                        onClose={props.onSignOut}
                        onChangePassword={props.onChangePassword}
                    />
                ) : (
                    <>
                        <LoadingBadge />
                    </>
                )}
            </div>
        </div>
    )
}