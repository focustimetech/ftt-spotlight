import React from 'react'

import {
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip
} from '@material-ui/core'

import { ITableColumn, SortOrder, TableColumns } from '../../types/table'

interface IEnhancedTableHeadProps<T> {
	columns: TableColumns<T>
	numSelected: number
	order: SortOrder
	orderBy: string
	rowCount: number
	onRequestSort: (columnKey: string) => void
	onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class EnhancedTableHead<T> extends React.Component<IEnhancedTableHeadProps<T>> {
	render() {
		const { onSelectAllClick, onRequestSort, columns, order, orderBy, numSelected, rowCount } = this.props

		return (
			<TableHead>
				<TableRow>
					{onSelectAllClick && (
						<TableCell padding='checkbox'>
							<Checkbox
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={numSelected === rowCount}
								onChange={(event) => onSelectAllClick(event)}
								color='primary'
							/>
						</TableCell>
					)}
					{Object.keys(columns).map((columnKey: string, index: number) => {
						const column: ITableColumn = columns[columnKey]
						return (
							<TableCell
								key={columnKey}
								align={column.type === 'number' ? 'right' : 'left'}
								padding={!onSelectAllClick && index === 0 ? 'default' : 'none'}
								sortDirection={orderBy === columnKey ? order : false}
							>
								<Tooltip
									title={`Sort by ${column.sortLabel || column.label}`}
									placement={column.type === 'number' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === columnKey}
										direction={order}
										onClick={() => onRequestSort(columnKey)}
									>
										{column.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						)
					})}
				</TableRow>
			</TableHead>
		)
	}
}

export default EnhancedTableHead
