import * as React from 'react'

import {
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip
} from '@material-ui/core'

import { ITableHeaderRow } from '../../types/table'

interface IProps {
	numSelected: number
	onRequestSort: (property: string) => void
	onSelectAllClick: (event: any) => void
	order: 'asc' |'desc'
	orderBy: string
	rows: ITableHeaderRow[]
	rowCount: number
}

export const EnhancedTableHead = (props: IProps) => {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = props

	const createSortHandler = (property: string) => {
		console.log('createSortHandler()')
		props.onRequestSort(property)
	}
	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>
				{rows.map((row: ITableHeaderRow) => (
					<TableCell
						key={row.id}
						align={row.isNumeric ? 'right' : 'left'}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}
					>
						<Tooltip
							title={'Sort by ' + row.label}
							placement={row.isNumeric ? 'bottom-end' : 'bottom-start'}
							enterDelay={300}
						>
							<TableSortLabel
								active={orderBy === row.id}
								direction={order}
								onClick={() => createSortHandler(row.id)}
							>
								{row.label}
							</TableSortLabel>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}