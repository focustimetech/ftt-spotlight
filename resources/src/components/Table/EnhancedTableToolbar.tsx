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

import { EnhancedTableFilter} from './EnhancedTableFilter'
import { ITableAction, ITableFilter, ITableHeaderColumn } from '../../types/table';

interface IProps {
	numSelected: number
	numShown: number
	numTotal: number
	title?: string
	children?: any
	searchable: boolean
	selectable: boolean
	tableQuery: string
	filters: ITableFilter[]
	filtersDisabled: boolean
	filterOpen: boolean
	columns: ITableHeaderColumn[]
	actions?: ITableAction[]
	loading: boolean
	// handleActionCallback: (id: string) => void
	handleInvertSelection: () => void
	handleFilterOpen: () => void
	handleFilterClose: () => void
	handleFilterChange: (filters: ITableFilter[], disabled: boolean) => void
	handleTableQueryChange: (value: string) => void
}

interface IState {
	searchOpen: boolean
	menuRef: any
}

export class EnhancedTableToolbar extends React.Component<IProps> {
	state: IState  = {
		searchOpen: false,
		menuRef: null
	}

	handleMenuOpen = (event: any) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleMenuClose = () => {
		this.setState({ menuRef: null })
	}

	handleOpenSearch = () => {
		this.setState({ searchOpen: true })
	}

	handleCloseSearch = () => {
		this.setState({ searchOpen: false }, () => {
			this.props.handleTableQueryChange('')
		})
	}

	handleInvertSelection = () => {
		this.props.handleInvertSelection()
		this.handleMenuClose()
	}

	handleActionSelect = (action: ITableAction) => {
		action.callback()
		this.handleMenuClose()
	}

	handleTableQueryChange = (event: any) => {
		if (event.keyCode === 27) {
			this.handleCloseSearch()
			return
		}
		this.props.handleTableQueryChange(event.target.value)
	}

	render() {
		const { numSelected, numShown, numTotal, filterOpen } = this.props
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
		} else {
			headerString = this.props.title
		}

		const loadingButton = () => (
			<div style={{ height: 48, width: 160 }}>
				<ContentLoader width={160} height={48} preserveAspectRatio='none'>
					<circle cx='24' cy='24' r='24' />
					<circle cx='80' cy='24' r='24' /> 
					<circle cx='136' cy='24' r='24' /> 
				</ContentLoader>
			</div>
		)

		return (
			<Toolbar>
				<div className='enhanced-table__toolbar'>
					{headerString && (
						<Typography variant='h6' className={classNames({
							'num-selected': numSelected > 0 || (numTotal > 0 && numShown < numTotal)
						})}>{headerString}</Typography>
					)}
					{filterOpen && (
						<EnhancedTableFilter
							filters={this.props.filters}
							disabled={this.props.filtersDisabled}
							open={filterOpen}
							handleFilterChange={this.props.handleFilterChange}
							columns={this.props.columns.filter((column: ITableHeaderColumn) => {
								return column.filterable
							})}
							handleFilterClose={this.props.handleFilterClose}
						/>
					)}
					{this.props.loading ? (
						loadingButton()
					) : (
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
												autoFocus
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
												<MenuItem key={action.id} onClick={() => this.handleActionSelect(action)}>{action.name}</MenuItem>
											))
										)}
									</Menu>
								</li>
							)}
							{this.props.children}
						</ul>
					)}
				</div>
			</Toolbar>
		)
	}
}
