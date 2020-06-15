import React from 'react'

import { CircularProgress, Grow, Switch } from '@material-ui/core'
import { SwitchProps } from '@material-ui/core/Switch'

import Flexbox from '../../Layout/Flexbox'

interface ILoadingSwitchProps extends SwitchProps {
    loading: boolean
}

const LoadingSwitch = (props: ILoadingSwitchProps) => {
    const { disabled, loading, ...rest } = props
    return (
        <Flexbox>
            <Grow in={loading}>
                <CircularProgress size={24} />
            </Grow>
            <Switch {...rest} disabled={disabled || loading} />
        </Flexbox>
    )
}

export default LoadingSwitch
