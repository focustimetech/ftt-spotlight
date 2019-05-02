import * as React from 'react'

import TablePagination, { TablePaginationProps } from '@material-ui/core/TablePagination'

interface IProps extends TablePaginationProps {
    loading: boolean
}

export const EnhancedTablePagination = (props: IProps) => {
    return (
        <TablePagination {...props} />
    )
}