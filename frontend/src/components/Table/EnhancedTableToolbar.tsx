import * as React from 'react'

import {
	Badge,
	Fade,
	Grow,
	Icon,
	IconButton,
	InputAdornment,
	TextField,
	Toolbar,
	Tooltip
} from '@material-ui/core'

import { EnhancedTableFilter} from './EnhancedTableFilter'
import { ITableFilter, ITableHeaderColumn } from '../../types/table';

interface IProps {
	numSelected: number
	title: string
	searchable: boolean
	tableQuery: string
	filters: ITableFilter[]
	filterOpen: boolean
	columns: ITableHeaderColumn[]
	handleFilterOpen: () => void
	handleFilterClose: () => void
	handleFilterChange: (filters: ITableFilter[]) => void
	handleTableQueryChange: (value: string) => void
}

interface IState {
	searchOpen: boolean
}

export class EnhancedTableToolbar extends React.Component<IProps> {
	state: IState  = {
		searchOpen: false
	}

	handleOpenSearch = () => {
		this.setState({ searchOpen: true })
	}

	handleCloseSearch = () => {
		this.setState({ searchOpen: false }, () => {
			this.props.handleTableQueryChange('')
		})
	}

	handleTableQueryChange = (event: any) => {
		if (event.keyCode === 27) {
			this.handleCloseSearch()
			return
		}
		this.props.handleTableQueryChange(event.target.value)
	}

	render() {
		const { numSelected, filterOpen, title } = this.props

		return (
			<Toolbar>
				<div className='enhanced-table__toolbar'>
					{numSelected > 0 ? (
						<h3 className='num-selected'>{numSelected} selected</h3>
					) : (
						<h3>{title}</h3>
					)}
					<EnhancedTableFilter
						filters={this.props.filters}
						open={filterOpen}
						handleFilterChange={this.props.handleFilterChange}
						columns={this.props.columns.filter((column: ITableHeaderColumn) => {
							return column.filterable
						})}
						handleFilterClose={this.props.handleFilterClose}
					/>
					<ul className='enhanced-table__tools'>
						{this.props.searchable && (
							<>
								<Grow in={this.state.searchOpen}>
									<li>
										<TextField
											className='enhanced-table__search'
											onChange={this.handleTableQueryChange}
											placeholder={`Search ${this.props.title}`}
											value={this.props.tableQuery}
											variant='standard'
											margin='none'
										/>
									</li>
								</Grow>
								<li>
									{this.state.searchOpen ? (
										<Tooltip title='Close Search'>
											<IconButton onClick={() => this.handleCloseSearch()}>
												<Icon>close</Icon>
											</IconButton>
										</Tooltip>
									) : (
										<Tooltip title='Search'>
											<IconButton onClick={() => this.handleOpenSearch()}>
												<Icon>search</Icon>
											</IconButton>
										</Tooltip>
									)}
								</li>
							</>
						)}
						<li>
							<Tooltip title='Filter'>
								<IconButton onClick={this.props.handleFilterOpen}>
								<Badge
									invisible={this.props.filters.length === 0}
									color='primary'
									variant='dot'
								>
									<Icon>filter_list</Icon>
								</Badge>
								</IconButton>
							</Tooltip>
						</li>
						<li>
						<IconButton>
							<Icon>more_vert</Icon>
						</IconButton>
						</li>
					</ul>
				</div>
			</Toolbar>
		)
	}
}
