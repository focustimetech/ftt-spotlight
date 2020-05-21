import React from 'react'

import classNames from 'classnames'
import ContentLoader from 'react-content-loader'

import {
	Badge,
	Grow,
	Icon,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Toolbar,
	Tooltip,
	Typography
} from '@material-ui/core'

import { ITableAction, ITableFilter, ITableColumn, TableColumns } from '../../types/table'

import EnhancedTableFilter from './EnhancedTableFilter'

interface IEnhancedTableToolbarProps<T> {
	numSelected: number
	numShown: number
	numTotal: number
	title: string
	children?: any
	searchable: boolean
	selectable: boolean
	tableQuery: string
	filters: ITableFilter[]
	filtersDisabled: boolean
	filterOpen: boolean
	columns: TableColumns<T>
	actions?: ITableAction[]
	onInvertSelection: () => void
	onFilterOpen: () => void
	onFilterClose: () => void
	onFilterChange: (filters: ITableFilter[], disabled: boolean) => void
	onTableQueryChange: (value: string) => void
}

interface IEnhancedTableToolbarState {
	searchOpen: boolean
	menuRef: Element
}

class EnhancedTableToolbar<T> extends React.Component<IEnhancedTableToolbarProps<T>, IEnhancedTableToolbarState> {
	state: IEnhancedTableToolbarState  = {
		searchOpen: false,
		menuRef: null
	}
	searchInput: any

	handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleMenuClose = () => {
		this.setState({ menuRef: null })
	}

	handleOpenSearch = () => {
		this.props.onTableQueryChange('')
		this.setState({ searchOpen: true }, () => {
			this.searchInput.focus()
		})
	}

	handleCloseSearch = () => {
		this.setState({ searchOpen: false })
	}

	handleFilterChange = (filters: ITableFilter[], disabled: boolean) => {
		console.log('toolbar.handleFilterChange')
		this.props.onFilterChange([...filters], disabled)
	}
	handleInvertSelection = () => {
		this.props.onInvertSelection()
		this.handleMenuClose()
	}

	handleActionSelect = (action: ITableAction) => {
		action.callback()
		this.handleMenuClose()
	}

	handleTableQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		this.props.onTableQueryChange(value)
	}

	handleTableQueryKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const key: string | number = event.key || event.keyCode
		if (key === 27 || key === 'Esc') {
			this.handleCloseSearch()
			return
		}
	}

	render() {
		const { columns, numSelected, numShown, numTotal, filterOpen, title } = this.props
		const { menuRef } = this.state
		const menuOpen = Boolean(menuRef)

		let headerString: string
		if (numSelected > 0 || (numTotal > 0 && numShown < numTotal)) {
			if (numSelected > 0 && (numTotal > 0 && numShown < numTotal)) {
				headerString = `Showing ${numShown} of ${numTotal}, ${numSelected} selected`
			} else if (numSelected > 0) {
				headerString = `${numSelected} selected`
			} else {
				headerString = `Showing ${numShown} of ${numTotal}`
			}
		}

		return (
			<Toolbar>
				<div className='enhanced-table__toolbar'>
					<Typography
						variant='h6'
						className={classNames({ 'num-selected': numSelected > 0 || (numTotal > 0 && numShown < numTotal) })}
					>
						{`${title} ${headerString || ''}`.trim()}
					</Typography>
					{filterOpen && (
						<EnhancedTableFilter<T>
							filters={this.props.filters}
							disabled={this.props.filtersDisabled}
							open={filterOpen}
							onFilterChange={this.handleFilterChange}
							columns={columns}
							onFilterClose={this.props.onFilterClose}
						/>
					)}
					<ul className='enhanced-table__tools'>
						{this.props.searchable && (
							<>
								<Grow in={this.state.searchOpen}>
									<li>
										<TextField
											className='enhanced-table__search'
											onChange={this.handleTableQueryChange}
											onKeyDown={this.handleTableQueryKeyDown}
											placeholder={`Search ${this.props.title}`}
											value={this.props.tableQuery}
											variant='standard'
											margin='none'
											autoFocus
											inputRef={(input) => {
												this.searchInput = input
											}}
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
								<IconButton onClick={() => this.props.onFilterOpen()}>
								<Badge
									invisible={this.props.filters.length === 0 || this.props.filtersDisabled}
									color='secondary'
									variant='dot'
								>
									<Icon>filter_list</Icon>
								</Badge>
								</IconButton>
							</Tooltip>
						</li>
						{this.props.selectable && (
							<li>
								<IconButton onClick={this.handleMenuOpen}>
									<Icon>more_vert</Icon>
								</IconButton>
								<Menu
									open={menuOpen}
									anchorEl={menuRef}
									onClose={this.handleMenuClose}
								>
									<MenuItem onClick={() => this.handleInvertSelection()}>Invert selection</MenuItem>
									{(this.props.numSelected > 0 && this.props.actions && this.props.actions.length) && (
										this.props.actions.map((action: ITableAction) => (
											<MenuItem
												key={action.id}
												onClick={() => this.handleActionSelect(action)}
											>{action.name}</MenuItem>
										))
									)}
								</Menu>
							</li>
						)}
						{this.props.children}
					</ul>
				</div>
			</Toolbar>
		)
	}
}

export default EnhancedTableToolbar
