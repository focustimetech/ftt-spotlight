import * as React from 'react'

import {
	Icon,
	IconButton,
	Toolbar,
	Tooltip
} from '@material-ui/core'

import { EnhancedTableFilter} from './EnhancedTableFilter'
import { ITableFilter, ITableHeaderColumn } from '../../types/table';

interface IProps {
	numSelected: number
	title: string
	filters: ITableFilter[]
	filterOpen: boolean
	columns: ITableHeaderColumn[]
	handleFilterOpen: () => void
	handleFilterClose: () => void
	handleFilterChange: (filters: ITableFilter[]) => void
}

export const EnhancedTableToolbar = (props: IProps) => {
	const { numSelected, filterOpen, title } = props

	return (
		<Toolbar>
			<div className='enhanced-table__toolbar'>
				{numSelected > 0 ? (
					<h5>{numSelected} selected</h5>
				) : (
					<h5>{title}</h5>
				)}
				{filterOpen && (
					<EnhancedTableFilter
						filters={props.filters}
						handleFilterChange={props.handleFilterChange}
						columns={props.columns}
					/>
				)}
				<ul>
					<li>
						<Tooltip title='Filter'>
							<IconButton onClick={props.handleFilterOpen}>
								<Icon>filter_list</Icon>
							</IconButton>
						</Tooltip>
					</li>
				</ul>
			</div>
		</Toolbar>
	)
}