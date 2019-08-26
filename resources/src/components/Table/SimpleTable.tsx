import * as React from 'react'

import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead
} from '@material-ui/core'

interface IProps {
    headers: string[]
    data: any[]
}

export const SimpleTable = (props: IProps) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {props.headers.map((header: string) => (
                        <TableCell
                            key={header}
                            style={{color: '#000', fontWeight: 500}}
                        >
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((row: any[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                        {row.map((item: any, columnIndex: number) => (
                            <TableCell
                                key={columnIndex}
                                style={{borderBottom: 'none'}}
                                padding='none'
                                align='left'
                                component='th'
                            >
                                {item}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
