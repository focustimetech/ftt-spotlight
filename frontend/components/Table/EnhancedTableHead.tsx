import React from 'react'

import {
	Checkbox,
	Radio,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip
} from '@material-ui/core'

import { ITableHeaderColumn, ITableLink, SortOrder } from '../../types/table'

interface IProps {
	columns: ITableHeaderColumn[]
	numSelected: number
	order: SortOrder
	orderBy: string
	loading: boolean
	rowCount: number
	selectable: boolean
	link?: ITableLink
	radio?: boolean
	onRequestSort: (property: string) => void
	onSelectAllClick: (event: any) => void
}

export const EnhancedTableHead = (props: IProps) => {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, selectable, link } = props
	const columns = props.columns.filter((column: ITableHeaderColumn) => {
		return column.visible
	})

	const createSortHandler = (property: string) => {
		props.onRequestSort(property)
	}

	return (
		<TableHead>
			<TableRow>
				{selectable && (
					<TableCell padding='checkbox'>
						{props.radio ? (
							<Radio
								checked={numSelected > 0}
								onClick={onSelectAllClick}
								color='primary'
							/>
						) : (
							<Checkbox
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={numSelected === rowCount}
								onChange={onSelectAllClick}
								color='primary'
							/>
						)}
					</TableCell>
				)}
				{columns.map((column: ITableHeaderColumn, index: number) => (
					<TableCell
						key={column.id}
						align={column.isNumeric ? 'right' : 'left'}
						padding={column.disablePadding ? (!selectable && index === 0 ? 'default' : 'none') : 'default'}
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
				{(link && selectable) && (
					<TableCell key={props.link.key} align='left' padding='default'>{link.label}</TableCell>
				)}
			</TableRow>
		</TableHead>
	)
}
