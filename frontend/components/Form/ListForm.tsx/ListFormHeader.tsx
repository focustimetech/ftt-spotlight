import classNames from 'classnames'
import React from 'react'

import Typography, { TypographyProps } from '@material-ui/core/Typography'

const ListFormHeader = (props: TypographyProps) => {
    const { className, children, variant, ...rest } = props
    return (
        <Typography {...rest} className={classNames('list-form__header', className)} variant={variant || 'h6'}>
            {children}
        </Typography>
    )
}

export default ListFormHeader
