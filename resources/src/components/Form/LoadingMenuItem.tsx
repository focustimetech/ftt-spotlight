import * as React from 'react'
import classNames from 'classnames'

import { MenuItemProps } from '@material-ui/core/MenuItem'
import { MenuItem, CircularProgress } from '@material-ui/core'

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
