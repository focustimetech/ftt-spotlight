import * as React from 'react'

import {
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip
} from '@material-ui/core'

import { ITableHeaderColumn } from '../../types/table'

interface IProps {
	numSelected: number
	onRequestSort: (property: string) => void
	onSelectAllClick: (event: any) => void
	order: 'asc' |'desc'
	orderBy: string
	columns: ITableHeaderColumn[]
	rowCount: number
	loading: boolean
}

export const EnhancedTableHead = (props: IProps) => {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props
	const columns = props.columns.filter((column: ITableHeaderColumn) => {
		return column.visible
	})

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
				{columns.map((column: ITableHeaderColumn) => (
					<TableCell
						key={column.id}
						align={column.isNumeric ? 'right' : 'left'}
						padding={column.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === column.id ? order : false}
					>
						<Tooltip
							title={'Sort by ' + column.label}
							placement={column.isNumeric ? 'bottom-end' : 'bottom-start'}
							enterDelay={300}
						>
							<TableSortLabel
								active={orderBy === column.id}
								direction={order}
								onClick={() => createSortHandler(column.id)}
							>
								{column.label}
							</TableSortLabel>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}