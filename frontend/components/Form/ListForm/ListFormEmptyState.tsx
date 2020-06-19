import classNames from 'classnames'
import React from 'react'

import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { CircularProgress } from '@material-ui/core'

interface IListFormEmptyState extends TypographyProps {
    loading: boolean
}

const ListFormEmptyState = (props: IListFormEmptyState) => {
    const { className, children, variant, loading, ...rest } = props
    return loading ? (
        <CircularProgress />
    ) : (
        <Typography {...rest} className={classNames('list-form__empty-state', className)} variant={variant || 'body1'}>
            {children}
        </Typography>
    )
}

export { ListFormEmptyState }
