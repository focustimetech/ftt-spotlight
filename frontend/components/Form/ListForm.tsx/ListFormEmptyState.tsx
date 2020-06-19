import classNames from 'classnames'
import React from 'react'

import Typography, { TypographyProps } from '@material-ui/core/Typography'

const ListFormEmptyState = (props: TypographyProps) => {
    const { className, children, variant, ...rest } = props
    return (
        <Typography {...rest} className={classNames('list-form__empty-state', className)} variant={variant || 'body1'}>
            {children}
        </Typography>
    )
}

export default ListFormEmptyState
