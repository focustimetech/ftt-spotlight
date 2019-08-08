import * as React from 'react'
import { ButtonProps } from '@material-ui/core/Button'
import { Button, CircularProgress } from '@material-ui/core'

interface IProps extends ButtonProps {
    loading: boolean
}

export const LoadingButton: React.SFC<IProps> = (props) => {
    const { disabled, loading, ...rest } = props
    return (
        <div className='button-container'>
            <Button {...rest} disabled={disabled || loading}/>
            {loading && (
                <CircularProgress size={24} className='button-progress' />
            )}
        </div>
    )
}
