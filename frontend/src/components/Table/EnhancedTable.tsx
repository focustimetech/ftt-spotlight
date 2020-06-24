import { format } from 'date-fns'
import React from 'react'

import {
	Checkbox,
	Icon,
	Paper,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Tooltip
} from '@material-ui/core'
import { PaperProps } from '@material-ui/core/Paper'

import {
	ITableAction,
	ITableEnumFilter,
	ITableFilter,
	ITableColumn,
	SortOrder,
	TableColumns,
	ITableGenericFilter
} from '../../types/table'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const desc = (a: any, b: any, orderBy: string): number => {
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
	return stabilizedThis.map((item: any) => item[0])
}

const getSorting = (order: SortOrder, orderBy: string) => {
	return order === 'desc' ? (
		(a: any, b: any) => desc(a, b, orderBy)
	) : (
		(a: any, b: any) => -desc(a, b, orderBy)
	)
}

interface IEnhancedTableProps<T> {
	title: string
	columns: TableColumns<T>
	data: Array<T>
	actions?: ITableAction[]
	defaultRowsPerPage?: number
	searchable?: boolean
	selected?: number[]
	PaperProps?: PaperProps
	onSelect?: (selected: number[]) => void
	dateFormat?: (date: Date) => string
}

interface IEnhancedTableState {
	tableQuery: string
	order: SortOrder
	orderBy: string
	page: number
	rowsPerPage: number
	filters: ITableFilter[]
	filtersDisabled: boolean
	filterOpen: boolean
}

class EnhancedTable<T> extends React.Component<IEnhancedTableProps<T>, IEnhancedTableState> {
	state: IEnhancedTableState = {
		tableQuery: '',
		order: 'asc',
		orderBy: Object.keys(this.props.columns)[0],
		page: 0,
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
		console.log('table.handleFilterChange')
		this.setState({
			filters,
			filtersDisabled: disabled
		})
	}

	isSelectable = (): boolean => {
		return Boolean(this.props.onSelect)
	}

	filterTableData = (): T[] => {
		const { tableQuery, filters } = this.state
		console.log('filters:', filters)
		const searchableColumnKeys: string[] = Object.keys(this.props.columns)
			.filter((columnKey: string) => this.props.columns[columnKey].searchable)

		return this.props.data.filter((row: T) => {
			const enumFilters: ITableEnumFilter[] = filters.filter((filter: ITableFilter) => filter.type === 'enum') as ITableEnumFilter[]
			const otherFilters: ITableGenericFilter[] = filters.filter((filter: ITableFilter) => filter.type !== 'enum') as ITableGenericFilter[]

			const matchSearch: boolean = tableQuery.length > 0 ? (
				searchableColumnKeys.some((columnKey: string) => {
					return row[columnKey] && new RegExp(tableQuery.toLowerCase(), 'g').test(row[columnKey].toLowerCase())
				})
			) : true

			const matchEnums: boolean = enumFilters.length && !this.state.filtersDisabled ? (
				enumFilters.every((filter: ITableEnumFilter) => {
					return row[filter.columnKey] === filter.value
				})
			) : true
/*
			const matchFilters = otherFilters.length ? (
				otherFilters.some((filter: ITableGenericFilter) => {
					switch (filter.rule) {
						case 'contains':
							return row[filter.columnKey].includes(filter.value)
						case 'ends-with':
							return row[filter.id].endsWith(filter.value)
						case 'equal-to':
							// tslint:disable-next-line: triple-equals
							return row[filter.id] == filter.value
						case 'greater-than':
							return row[filter.id] > filter.value
						case 'less-than':
							return row[filter.id] < filter.value
						case 'not-equal-to':
							// tslint:disable-next-line: triple-equals
							return row[filter.id] != filter.value
						case 'starts-with':
							return row[filter.id].startsWith(filter.value)
					}
				})
			) : true
*/
			const matchFilters = true
			return matchSearch && matchFilters && matchEnums
		})
	}

	handleRequestSort = (property: any) => {
		let order: SortOrder = 'desc'
		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc'
		}
		this.setState({ order, orderBy: property })
	}

	handleSelectAllClick = (event: any) => {
		if (!this.props.onSelect) {
			return
		}
		let selected: number[] = []
		if (event.target.checked) {
			const selectedRows = (this.props.searchable && this.state.tableQuery.length) || (this.state.filters.length && !this.state.filtersDisabled)
				? this.filterTableData()
				: this.props.data
			selected = selectedRows.map((row: T, index: number) => index)
		}

		this.props.onSelect(selected)
	}

	handleInvertSelection = () => {
		const selected: number[] = this.props.data.map((row: T, index) => index).filter((index: number) => {
			return this.props.selected.indexOf(index) < 0
		})
		this.props.onSelect(selected)
	}

	handleClick = (index: number) => {
		if (!this.isSelectable()) {
			return
		}
		let newSelected: number[] = []
	
		const { selected } = this.props
		const selectedIndex = selected.indexOf(index)

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, index)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			)
		}

		this.props.onSelect(newSelected)
	}

	handleChangePage = (event: any, page: number) => {
		this.setState({ page })
	}

	handleChangeRowsPerPage = (event: any) => {
		this.setState({ rowsPerPage: event.target.value })
	}

	isSelected = (index: number): boolean => {
		return this.isSelectable() && this.props.selected.indexOf(index) !== -1
	}

	handleTableQueryChange = (value: string) => {
		this.setState({ tableQuery: value })
	}

	render() {
		const { order, orderBy, rowsPerPage, page } = this.state
		const { columns, selected } = this.props

		const filterableColumns: TableColumns<Partial<T>> = Object.keys(columns)
			.filter((key: string) => columns[key].filterable)
			.reduce((obj: Partial<TableColumns<T>>, key: string) => {
				return { ...obj, [key]: columns[key]}
			}, {})

		const visibleColumns: TableColumns<Partial<T>> = Object.keys(columns)
			.filter((key: string) => columns[key].hidden !== true)
			.reduce((obj: Partial<TableColumns<T>>, key: string) => {
				return { ...obj, [key]: columns[key]}
			}, {})

		const numSelected: number = selected ? selected.length : 0
		const selectable: boolean = this.isSelectable()
		const data: T[] = (this.props.searchable && this.state.tableQuery.length)
		|| (this.state.filters.length > 0 && !this.state.filtersDisabled) ? (
			this.filterTableData()
		) : (
			this.props.data
		)
		//console.log('props.data:', this.props.data)
		//console.log(stableSort(data, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))

		return (
			<div className='enhanced-table'>
				<Paper {...this.props.PaperProps}>
					<EnhancedTableToolbar<Partial<T>>
						title={this.props.title}
						searchable={this.props.searchable}
						selectable={selectable}
						tableQuery={this.state.tableQuery}
						numSelected={numSelected}
						numShown={data.length}
						numTotal={this.props.data.length}
						columns={filterableColumns}
						actions={this.props.actions}
						filters={this.state.filters}
						filtersDisabled={this.state.filtersDisabled}
						onInvertSelection={this.handleInvertSelection}
						onFilterOpen={this.handleFilterOpen}
						onFilterClose={this.handleFilterClose}
						onFilterChange={this.handleFilterChange}
						onTableQueryChange={this.handleTableQueryChange}
						filterOpen={this.state.filterOpen}
					>
						{this.props.children}
					</EnhancedTableToolbar>
					<div>
						<Table>
							<EnhancedTableHead<Partial<T>>
								columns={visibleColumns}
								numSelected={numSelected}
								order={order}
								orderBy={orderBy}
								onRequestSort={this.handleRequestSort}
								onSelectAllClick={this.handleSelectAllClick}
								rowCount={data.length}
							/>
							<TableBody className='enhanced-table__table-body'>
								{stableSort(data, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row: T, rowIndex: number) => {
									const isSelected = this.isSelected(rowIndex)
									return (
										<TableRow
											hover
											onClick={() => this.handleClick(rowIndex)}
											role={selectable ? 'checkbox' : null}
											aria-checked={isSelected}
											tabIndex={-1}
											key={rowIndex}
											selected={isSelected}
										>
											{selectable && (
												<TableCell padding={'checkbox'}>
													<Checkbox checked={isSelected} color='primary'/>
												</TableCell>
											)}
											{Object.keys(visibleColumns).map((columnKey: string, index: number) => {
												const column: ITableColumn = columns[columnKey]
												const isNumeric: boolean = column.type === 'number'
												let columnData: any = row[columnKey]
												if (column.type === 'date') {
													console.log('column.type === date; isNumeric:', isNumeric)
													columnData = this.props.dateFormat
														? this.props.dateFormat(columnData)
														: format(columnData, 'LLLL d, yyyy')
												}
												if (column.primary) {
													return (
														<TableCell
															align='left'
															component='th'
															scope='row'
															padding={selectable || index !== 0 ? 'none' : 'default'}
															key={columnKey}
														>
															{column.component ? column.component(columnData) : columnData}
														</TableCell>
													)
												} else {
													return (
														<TableCell align={isNumeric ? 'right' : 'left'} key={columnKey}>
															{column.component ? column.component(columnData) : columnData}
														</TableCell>
													)
												}
											})}
										</TableRow>
									)
								})}
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
			</div>
		)
	}
}

export default EnhancedTable
