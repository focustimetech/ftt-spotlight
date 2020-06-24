import classNames from 'classnames'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'

import {
	Button,
	FormControlLabel,
	Grow,
	Icon,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import {
	ITableDateFilter,
	ITableEnumColumn,
	ITableEnumFilter,
	ITableFilter,
	ITableGenericFilter,
	ITableColumn,
	ITableNumericFilter,
	ITableNumericFilterType,
	ITableStringFilter,
	ITableStringFilterType,
	TableColumns,
	ITableDateFilterType
} from '../../types/table'

const stringFilterRules: Record<ITableStringFilterType, string> = {
	'equal-to': 'Equal to',
	'not-equal-to': 'Not equal to',
	'starts-with': 'Starts with',
	'ends-with': 'Ends with',
	'contains': 'Contains'
}

const numericFilterRules: Record<ITableNumericFilterType, string> = {
	'less-than': 'Less than',
	'greater-than': 'Greater than',
	'equal-to': 'Equal to',
	'not-equal-to': 'Not equal to'
}

const dateFilterRules: Record<ITableDateFilterType, string> = {
	'before': 'Before',
	'equal-to': 'Equal to',
	'after': 'After'
}

interface IEnhancedTableFilterProps<T> {
	disabled: boolean
	filters: ITableFilter[]
	columns: TableColumns<T>
	open: boolean
	onFilterChange: (filters: ITableFilter[], disabled: boolean) => void
	onFilterClose: () => void
}

interface IEnhancedTableFilterState {
	disabled: boolean
	error: boolean
	filters: ITableFilter[]
}

type SelectChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string, value: any }>

class EnhancedTableFilter<T> extends React.Component<IEnhancedTableFilterProps<T>, IEnhancedTableFilterState> {
	state: IEnhancedTableFilterState = {
		disabled: this.props.disabled,
		error: false,
		filters: this.props.filters.length ? [...this.props.filters] : [this.newFilter()]
	}

	onApplyFilters = () => {
		this.setState({ error: false })
		if (this.allFiltersValid() || this.state.disabled) {
			this.setState({ error: false })
			this.props.onFilterChange(this.state.filters, this.state.disabled)
			return true
		} else {
			this.setState({ error: true })
			return false
		}
	}

	onUpdateFilters = () => {
		if (this.onApplyFilters()) {
			this.handleClose()
		}
	}

	onCancelFilters = () => {
		this.setState({ filters: this.props.filters })
		this.handleClose()
	}

	onAddFilter = () => {
		this.setState((state: IEnhancedTableFilterState) => ({
			filters: state.filters.concat(this.newFilter())
		}))
	}

	onRemoveFilter = (index: number) => {
		this.setState((state: IEnhancedTableFilterState) => ({
			filters: state.filters.filter((filter, idx) => {
				return index !== idx
			})
		}))
	}

	onDuplicateFilter = (index: number) => {
		const filters = [...this.state.filters, { ...this.state.filters[index] }]
		this.setState({ filters })
	}

	handleChangeFilterColumn = (event: React.ChangeEvent<{ name?: string, value: any }>, index: number) => {
		const { value } = event.target
		this.setState((state: IEnhancedTableFilterState) => {
			const { filters } = state
			const filter: ITableFilter = filters[index]
			const column: ITableColumn = this.props.columns[value]
			const hasTypeChanged: boolean = filter.type !== column.type || filter.type === 'enum'
			let newFilter: ITableFilter

			if (column.type === 'enum') {
				newFilter = {
					columnKey: value,
					value: hasTypeChanged ? (column as ITableEnumColumn).values[0] : filter.value,
					type: 'enum'
				} as ITableEnumFilter
			} else if (column.type === 'number') {
				newFilter = {
					columnKey: value,
					value: hasTypeChanged ? 0 : filter.value,
					type: 'number',
					rule: hasTypeChanged ? 'equal-to' : (filter as ITableNumericFilter).rule
				} as ITableNumericFilter
			} else if (column.type === 'date') {
				newFilter = {
					columnKey: value,
					value: hasTypeChanged ? new Date() : filter.value,
					type: 'date',
					rule: hasTypeChanged ? 'equal-to' : (filter as ITableDateFilter).rule
				} as ITableDateFilter
			} else {
				newFilter = {
					columnKey: value,
					value: hasTypeChanged ? '' : filter.value,
					type: 'string',
					rule: hasTypeChanged ? 'equal-to' : (filter as ITableStringFilter).rule
				} as ITableStringFilter
			}
			filters[index] = newFilter
			return { filters }
		})
	}

	handleChangeFilterRule = (event: React.ChangeEvent<{ name?: string, value: any }>, index: number) => {
		if (this.state.filters[index].type === 'enum') {
			return
		}
		const { value } = event.target
		const filters = [...this.state.filters]
		const filter = { ...filters[index], rule: value }
		filters[index] = filter
		this.setState({ filters })
	}

	handleChangeFilterValue = (value: any, index: number) => {
		const filters = [...this.state.filters]
		const filter = { ...this.state.filters[index], value }
		filters[index] = filter
		this.setState({ filters })
	}

	handleClose = () => {
		this.props.onFilterClose()
	}

	allFiltersValid = (): boolean => {
		return this.state.filters.length > 0
			? this.state.filters.every((filter: ITableFilter) => filter.type !== 'string' || filter.value.length > 0)
			: true
	}

	toggleDisabled = () => {
		this.setState((state: IEnhancedTableFilterState) => ({
			disabled: !state.disabled,
			error: false
		}))
	}

	newFilter(): ITableFilter {
		const columnKey: string = Object.keys(this.props.columns)[0]
		const column: ITableColumn = this.props.columns[columnKey]
		if (column.type === 'enum') {
			return { columnKey, type: 'enum', value: (column as ITableEnumColumn).values[0] }
		} else if (column.type === 'number') {
			return { columnKey, type: 'number', rule: 'equal-to',	value: 0 }
		} else if (column.type === 'date') {
			return { columnKey, type: 'date', rule: 'equal-to', value: new Date }
		} else {
			return { columnKey, type: 'string', rule: 'equal-to', value: '' }
		}
	}

	render() {
		console.log('props.filters:', this.props.filters)
		console.log('filters.filters:', this.state.filters)
		const haveFiltersChanged: boolean = this.state.filters.length === this.props.filters.length ? (
			!this.state.filters.every((filter: ITableFilter, index: number) => {
				const propFilter: ITableFilter = this.props.filters[index]
				const fitlerKeys: string[] = Object.keys(propFilter)
				return fitlerKeys.every((key: string) => {
					return filter[key] === propFilter[key]
				})
			}) || this.props.disabled !== this.state.disabled
		) : true

		/**
		 * @TODO Put filters Paper into a Popover
		 */
		return (
			<Grow in={this.props.open} >
				<Paper className='enhanced-table__filters' elevation={6}>
					<div className='filters-header'>
						<FormControlLabel
							control={
								<Switch checked={!this.state.disabled} onClick={() => this.toggleDisabled()} color='primary'/>
							}
							label={
								<Typography variant='h6'>Filters</Typography>
							}
							labelPlacement='start'
						/>
					</div>
					<ul>
						{this.state.filters.map((filter: ITableFilter, filterIndex: number) => {
							const errored: boolean = this.state.error && filter.type === 'string' && filter.value.length === 0
							const isEnum: boolean = filter.type === 'enum'
							const column: ITableColumn = this.props.columns[filter.columnKey]
							let filterRules: Record<string, string>
							switch (filter.type) {
								case 'string':
									filterRules = stringFilterRules
									break
								case 'number':
									filterRules = numericFilterRules
									break
								case 'date':
									filterRules = dateFilterRules
									break
							}

							return (
								<li key={filterIndex} className='filter-rule'>
									<Select
										name='column'
										margin='dense'
										value={filter.columnKey}
										onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {this.handleChangeFilterColumn(event, filterIndex)}}
										disabled={this.state.disabled}
									>
										{Object.keys(this.props.columns).map((columnKey: string) => {
											return (
												<MenuItem key={columnKey} value={columnKey}>
													{this.props.columns[columnKey].label}
												</MenuItem>
											)
										})}
									</Select>
									<Select
										name='rule'
										className={classNames({'--enum': isEnum})}
										margin='dense'
										value={isEnum ? filter.value : (filter as ITableGenericFilter).rule}
										onChange={(event: SelectChangeEvent) => isEnum
											? this.handleChangeFilterValue(event, filterIndex)
											: this.handleChangeFilterRule(event, filterIndex)
										}
										disabled={this.state.disabled}
									>
										{isEnum ? (
											(column as ITableEnumColumn).values.map((enumValue: string) => (
												<MenuItem value={enumValue} key={enumValue}>
													{enumValue}
												</MenuItem>
											))
										) : (
											Object.keys(filterRules).map((filterRule: string) => (
												<MenuItem value={filterRule} key={filterRule}>
													{filterRules[filterRule]}
												</MenuItem>
											)
										))}
									</Select>
									{filter.type === 'string' && (
										<TextField
											variant='standard'
											margin='dense'
											placeholder='Filter value'
											onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => this.handleChangeFilterValue(event.target.value, filterIndex)}
											value={filter.value}
											error={errored}
											helperText={errored ? 'This field cannot be empty.' : undefined}
											disabled={this.state.disabled}
										/>
									)}
									{filter.type === 'date' && (
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
												// variant='standard'
												margin='dense'
												placeholder='Filter value'
												onChange={(date: Date) => this.handleChangeFilterValue(date, filterIndex)}
												value={filter.value}
												disabled={this.state.disabled}
											/>
										</MuiPickersUtilsProvider>
									)}
									{filter.type === 'number' && (
										<TextField
											variant='standard'
											type='number'
											margin='dense'
											placeholder='Filter value'
											onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChangeFilterValue(event.target.value, filterIndex)}
											value={filter.value}
											disabled={this.state.disabled}
										/>
									)}
									<IconButton onClick={() => this.onDuplicateFilter(filterIndex)} disabled={this.state.disabled}>
										<Icon>filter_none</Icon>
									</IconButton>
									<IconButton
										disabled={this.state.filters.length === 1 || this.state.disabled}
										onClick={() => this.onRemoveFilter(filterIndex)}
									><Icon>close</Icon></IconButton>
								</li>
							)
						})}
						{this.state.filters.length > 0 && (
							<li className='filter-rule_placeholder'>
								<IconButton disabled={this.state.disabled} onClick={() => this.onAddFilter()}>
									<Icon>add</Icon>
								</IconButton>
							</li>
						)}
					</ul>
					<div className='filters-actions'>
						<Button variant='text' color='primary' onClick={() => this.onUpdateFilters()}>OK</Button>
						<Button
							variant='text'
							color='primary'
							disabled={!haveFiltersChanged}
							onClick={() => this.onApplyFilters()}
						>Apply</Button>
						<Button variant='text' onClick={() => this.onCancelFilters()}>Cancel</Button>
					</div>
				</Paper>
			</Grow>
		)
	}
}

export default EnhancedTableFilter
