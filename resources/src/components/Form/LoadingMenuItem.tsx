import classNames from 'classnames'
import React from 'react'

import { CircularProgress, MenuItem } from '@material-ui/core'
import { MenuItemProps } from '@material-ui/core/MenuItem'

interface IProps extends MenuItemProps {
    loading: boolean
}

export const LoadingMenuItem: React.SFC<IProps> = (props) => {
    const { disabled, loading, button, ...rest } = props
    return (
        <div className={classNames('menu-item-container', {['--loading']: props.loading})}>
            <MenuItem {...rest} disabled={disabled || loading} />
            {loading && (
                <CircularProgress size={24} className='menu-item-progress' />
            )}
        </div>
    )
}
