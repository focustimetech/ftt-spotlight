import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { Link, Redirect } from 'react-router-dom'

import {
	Checkbox,
	Icon,
	Paper,
	Radio,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Tooltip
} from '@material-ui/core'

import { EnhancedTableHead } from './EnhancedTableHead'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { EmptyStateIcon } from '../EmptyStateIcon'
import {
	ITableAction,
	ITableFilter,
	ITableEnumFilter,
	ITableHeaderColumn,
	ITableLink,
	SortOrder
} from '../../types/table';

const desc = (a: any, b: any, orderBy: any) => {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

const stableSort = (array: any[], cmp: any) => {
	const stabilizedThis: any[] = array.map((item, index) => [item, index])
	stabilizedThis.sort((a: any, b: any) => {
		const order = cmp(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map(item => item[0])
}

const getSorting = (order: SortOrder, orderBy: any) => {
	return order === 'desc' ? (
		(a: any, b: any) => desc(a, b, orderBy)
	) : (
		(a: any, b: any) => -desc(a, b, orderBy)
	)
}

interface IProps {
	columns: ITableHeaderColumn[]
	data: any[]
	loading: boolean
	actions?: ITableAction[]
	children?: any
	defaultRowsPerPage?: number
	link?: ITableLink
	radio?: boolean
	searchable?: boolean
	selected?: number[]
	showEmptyTable?: boolean
	title?: string
	onSelect?: (selected: number[]) => void
}

interface IState {
	tableQuery: string
	order: SortOrder
	orderBy: string
	page: number
	redirect: string
	rowsPerPage: number
	filters: ITableFilter[]
	filtersDisabled: boolean
	filterOpen: boolean
}

export class EnhancedTable extends React.Component<IProps, IState> {
	state: IState = {
		tableQuery: '',
		order: 'asc',
		orderBy: this.props.columns[0].id,
		page: 0,
		redirect: null,
		rowsPerPage: this.props.defaultRowsPerPage || 5,
		filters: [],
		filtersDisabled: true,
		filterOpen: false,
	}

	handleFilterOpen = () => {
		this.setState({ filterOpen: true })
	}

	handleFilterClose = () => {
		this.setState({ filterOpen: false })
	}

	handleFilterChange = (filters: ITableFilter[], disabled: boolean) => {
		this.setState({
			filters,
			filtersDisabled: disabled
		})
	}

	isSelectable = (): boolean => {
		return Boolean(this.props.onSelect)
	}

	filterTableData = (): any[] => {
		const { tableQuery, filters } = this.state
		const properties: string[] = this.props.columns.reduce((acc: string[], column: ITableHeaderColumn) => {
			if (column.searchable) {
				acc.push(column.id);
			}
			return acc
		}, [])
		return this.props.data.filter((row: any) => {
			const enumFilters: ITableEnumFilter[] = filters.filter((filter: ITableFilter) => filter.type === 'enum') as ITableEnumFilter[]
			const otherFilters: ITableFilter[] = filters.filter((filter: ITableFilter) => filter.type !== 'enum')

			const matchSearch: boolean = tableQuery.length > 0 ? (
				properties.some((property) => {
					return row[property] && new RegExp(tableQuery.toLowerCase(), 'g').test(row[property].toLowerCase())
				})
			) : true

			const matchEnums: boolean = enumFilters.length && !this.state.filtersDisabled ? (
				enumFilters.every((filter: ITableEnumFilter) => {
					return row[filter.id] === filter.value
				})
			) : true

			const matchFilters = otherFilters.length ? (
				otherFilters.some((filter: ITableFilter) => {
					switch (filter.rule) {
						case 'contains':
							return row[filter.id].includes(filter.value)
						case 'ends-with':
							return row[filter.id].endsWith(filter.value)
						case 'equal-to':
							return row[filter.id] == filter.value
						case 'greater-than':
							return row[filter.id] > filter.value
						case 'less-than':
							return row[filter.id] < filter.value
						case 'not-equal-to':
							return row[filter.id] != filter.value
						case 'starts-with':
							return row[filter.id].startsWith(filter.value)
					}
				})
			) : true
			return matchSearch && matchFilters && matchEnums
		})
	}

	handleRequestSort = (property: any) => {
		let order: SortOrder = 'desc'
		if (this.state.orderBy === property && this.state.order === 'desc')
			order = 'asc'

		this.setState({ order, orderBy: property })
	}

	handleSelectAllClick = (event: any) => {
		if (!this.props.onSelect)
			return
		let newSelected: number[] = []
		if (event.target.checked && this.props.radio !== true) {
			newSelected = (this.props.searchable && this.state.tableQuery.length) || (this.state.filters.length && !this.state.filtersDisabled) ? (
				this.filterTableData().map(n => n.id)
			) : (
				this.props.data.map(n => n.id)
			)
		}
		
		this.props.onSelect(newSelected)
	}

	handleInvertSelection = () => {
		if (!this.isSelectable() || this.props.radio)
			return
		const newSelected: number[] = this.props.data.map(n => n.id).filter((index: number) => {
			return this.props.selected.indexOf(index) < 0
		})
		this.props.onSelect(newSelected)
	}

	handleClick = (id: number) => {
		if (!this.isSelectable())
			return
		let newSelected: number[] = []
		if (this.props.radio)
			newSelected = [id]
		else {
			const { selected } = this.props
			const selectedIndex = selected.indexOf(id)

			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, id)
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selected.slice(1))
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(
					selected.slice(0, selectedIndex),
					selected.slice(selectedIndex + 1),
				)
			}
		}

		this.props.onSelect(newSelected)
	}

	handleChangePage = (event: any, page: number) => {
		this.setState({ page })
	}

	handleChangeRowsPerPage = (event: any) => {
		this.setState({ rowsPerPage: event.target.value })
	}

	isSelected = (id: number): boolean => {
		if (!this.isSelectable())
			return false
		return this.props.selected.indexOf(id) !== -1
	}

	handleTableQueryChange = (value: string) => {
		this.setState({ tableQuery: value })
	}

	skeletonRows = () => {
		const rows: any = []
		for (let i = 0; i < this.state.rowsPerPage; i ++) {
			rows.push(
				<TableRow key={i}>
					<TableCell padding='checkbox'>
						<div style={{ width: 24, height: 24, padding: 12}}>
							<ContentLoader width={24} height={24}>
								<rect x='0' y='0' rx='4' ry='4' height='24' width='24' />
							</ContentLoader>
						</div>
					</TableCell>
					{this.props.columns.map((column: ITableHeaderColumn) => {
						if (column.th) {
							return (
								<TableCell component='th' scope='row' padding='none' key={column.id}>
									<div style={{height: 24, width: 75}}>
										<ContentLoader width={75} height={24}>
											<rect x='0' y='0' rx='4' ry='4' width='75' height='8' />
										</ContentLoader>
									</div>
								</TableCell>
							)
						} else {
							return <TableCell align='right' key={column.id}>
								<div style={{height: 24, width: 50, float: 'right'}}>
										<ContentLoader width={50} height={24}>
											<rect x='0' y='0' rx='4' ry='4' width='50' height='8' />
										</ContentLoader>
									</div>
							</TableCell>
						}
					})}
				</TableRow>
			)
		}
		return rows
	}

	render() {
		if (this.state.redirect)
			return <Redirect to={this.state.redirect} />

		const { order, orderBy, rowsPerPage, page } = this.state
		const { selected } = this.props
		const numSelected: number = selected ? selected.length : 0
		const selectable: boolean = this.isSelectable()
		const data: any[] = (this.props.searchable && this.state.tableQuery.length)
		|| (this.state.filters.length && !this.state.filtersDisabled) ? (
			this.filterTableData()
		) : (
			this.props.data
		)

		return (
			<div className='enhanced-table'>
				{this.props.data.length === 0 && !this.props.loading && this.props.showEmptyTable !== false ? (
					<div className='empty-state'>
						<EmptyStateIcon variant='file'>
							<h3>{`${this.props.title ? `${this.props.title} table` : 'Table'} is empty.`}</h3>
						</EmptyStateIcon>
					</div>
				) : (
					<Paper>
						<EnhancedTableToolbar
							title={this.props.title}
							searchable={this.props.searchable}
							selectable={selectable}
							tableQuery={this.state.tableQuery}
							numSelected={numSelected}
							numShown={data.length}
							numTotal={this.props.data.length}
							columns={this.props.columns}
							actions={this.props.actions}
							filters={this.state.filters}
							filtersDisabled={this.state.filtersDisabled}
							handleInvertSelection={this.handleInvertSelection}
							handleFilterOpen={this.handleFilterOpen}
							handleFilterClose={this.handleFilterClose}
							handleFilterChange={this.handleFilterChange}
							handleTableQueryChange={this.handleTableQueryChange}
							filterOpen={this.state.filterOpen}
							loading={this.props.loading}
						>
							{this.props.children}
						</EnhancedTableToolbar>
						<div>
							<Table>
								<EnhancedTableHead
									columns={this.props.columns}
									link={this.props.link}
									loading={this.props.loading}
									numSelected={numSelected}
									order={order}
									orderBy={orderBy}
									onRequestSort={this.handleRequestSort}
									onSelectAllClick={this.handleSelectAllClick}
									radio={this.props.radio}
									rowCount={data.length}
									selectable={selectable}
								/>
								<TableBody className='enhanced-table__table-body'>
									{this.props.loading ? (
										this.skeletonRows()
									) : (
										stableSort(data, getSorting(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(n => {
											const isSelected = this.isSelected(n.id)
											const columns = this.props.columns.filter((column: ITableHeaderColumn) => {
												return column.visible
											})
											return (
												<TableRow
													hover
													onClick={() => this.handleClick(n.id)}
													role={selectable ? 'checkbox' : null}
													aria-checked={isSelected}
													tabIndex={-1}
													key={n.id}
													selected={isSelected}
												>
													{selectable && (
														<TableCell padding={'checkbox'}>
															{this.props.radio ? (
																<Radio checked={isSelected} color='primary'/>
															) : (
																<Checkbox checked={isSelected} color='primary'/>
															)}
														</TableCell>
													)}
													{columns.map((column: ITableHeaderColumn, index: number) => {
														const columnData: any = n[column.id]
														if (column.th) {
															return (
																<TableCell component='th' scope='row' padding={selectable || index !== 0 ? 'none' : 'default'} key={column.id}>
																	{this.props.link && !selectable ? (
																		<Link className='enhanced-table__link' to={`${this.props.link.path}/${n[this.props.link.key]}`}>
																			{columnData}
																		</Link>
																	) : columnData
																	}
																</TableCell>
															)
														} else {
															return <TableCell align='right' key={column.id}>{columnData}</TableCell>
														}
													})}
													{(this.props.link && selectable)  && (	
														<TableCell padding='checkbox' align='center'>
															<Tooltip title={this.props.link.label} placement='left'>
																<Link to={`${this.props.link.path}/${n[this.props.link.key]}`}>
																	<Icon>launch</Icon>
																</Link>
															</Tooltip>
														</TableCell>
													)}
												</TableRow>
											)
										})
									)}
								</TableBody>
							</Table>
						</div>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							backIconButtonProps={{
								'aria-label': 'Previous Page'
							}}
							nextIconButtonProps={{
								'aria-label': 'Next Page'
							}}
							onChangePage={this.handleChangePage}
							onChangeRowsPerPage={this.handleChangeRowsPerPage}
						/>
					</Paper>
				)}
			</div>
		)
	}
}
