import * as React from 'react'
import { IconButtonProps } from '@material-ui/core/IconButton'
import { IconButton, CircularProgress } from '@material-ui/core'

interface IProps extends IconButtonProps {
    loading: boolean
    children: any
}

export class LoadingIconButton extends React.Component<IProps> {
    render() {
        const { disabled, loading, children, ...rest } = this.props
        return (
            <div className='button-container'>
                <IconButton {...rest} disabled={disabled || loading}>
                    {children}
                </IconButton>
                {loading && (
                    <CircularProgress size={24} className='button-progress' />
                )}
            </div>
        )
    }
}
