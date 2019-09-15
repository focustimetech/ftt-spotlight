import * as React from 'react'

import {
	Button,
	Icon,
	IconButton,
	FormControlLabel,
	Grow,
	MenuItem,
	Paper,
	Select,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core'

import {
	ITableFilter,
	ITableHeaderColumn,
	ITableNumericFilterType,
	ITableStringFilterType,
	ITableStringFilter,
	ITableNumericFilter,
} from '../../types/table';

interface StringFilterRule {
	label: string,
	value: ITableStringFilterType
}

interface NumericFilterRule {
	label: string,
	value: ITableNumericFilterType
}

const stringFilterRules: StringFilterRule[] = [
	{ label: 'Equal to', value: 'equal-to' },
	{ label: 'Not equal to', value: 'not-equal-to' },
	{ label: 'Starts with', value: 'starts-with' },
	{ label: 'Ends with', value: 'ends-with' }, 
	{ label: 'Contains', value: 'contains' }
]

const numericFilterRules: NumericFilterRule[] = [
	{ label: 'Less than', value: 'less-than' },
	{ label: 'Greater than', value: 'greater-than' },
	{ label: 'Equal to', value: 'equal-to' },
	{ label: 'Not equal to', value: 'not-equal-to' }
]

interface IProps {
	disabled: boolean
	filters: ITableFilter[]
	columns: ITableHeaderColumn[]
	open: boolean
	handleFilterChange: (filters: ITableFilter[], disabled: boolean) => void
	handleFilterClose: () => void
}

interface IState {
	disabled: boolean
	filters: ITableFilter[]
}

export class EnhancedTableFilter extends React.Component<IProps, IState> {
	state: IState = {
		disabled: this.props.disabled,
		filters: this.props.filters.length ? this.props.filters : [this.newFilter()]
	}

	private newFilter(): ITableFilter {
		let filter: ITableFilter
		if (this.props.filters.length) {
			filter = {
				...this.props.filters[this.props.filters.length - 1],
				value: ''
			}
		} else {
			if (this.props.columns[0].isNumeric) {
				filter = {
					id: this.props.columns[0].id,
					type: 'numeric',
					rule: numericFilterRules[0].value,
					value: ''
				}
			} else {
				filter = {
					id: this.props.columns[0].id,
					type: 'string',
					rule: stringFilterRules[0].value,
					value: ''
				}
			}
		}
		return filter
	}

	onApplyFilters = () => {
		this.props.handleFilterChange(this.state.filters, this.state.disabled)
	}

	onUpdateFilters = () => {
		this.onApplyFilters()
		this.handleClose()
	}

	onCancelFilters = () => {
		this.setState({ filters: this.props.filters })
		this.handleClose()
	}

	onAddFilter = () => {
		this.setState((state: IState) => {
			return {filters: state.filters.concat(this.newFilter()) }
		})
	}

	onRemoveFilter = (index: number) => {
		this.setState((state: IState) => {
			return { 
				filters: state.filters.filter((filter, idx) => {
					return index !== idx
				})
			}
		})
	}

	onDuplicateFilter = (index: number) => {
		this.setState((state: IState) => {
			const newFilter: ITableFilter = state.filters.find((filter, idx: number) => {
				return index === idx
			})
			return {
				filters: [...state.filters, newFilter]
			}
		})
	}

	handleChangeFilterID = (value: any, index: number) => {
		this.setState((state: IState) => {
			const filters: ITableFilter[] = state.filters.map((filter: ITableNumericFilter | ITableStringFilter, idx: number) => {
				if (idx !== index) {
					return filter
				} else {
					const column = this.props.columns.find((column: ITableHeaderColumn) => {
						return column.id === value
					})
					const hasTypeChanged: boolean = filter.type === 'string' ? column.isNumeric : !column.isNumeric
					let newFilter: ITableStringFilter | ITableNumericFilter
					newFilter = {
						id: value,
						value: hasTypeChanged ? '' : filter.value,
						type: 'string',
						rule: hasTypeChanged ? stringFilterRules[0].value : (filter as ITableStringFilter).rule
					} as ITableStringFilter
					if (hasTypeChanged && column.isNumeric) {
						newFilter =  {
							id: value,
							value: hasTypeChanged ? '' : filter.value,
							type: 'numeric',
							rule: hasTypeChanged ? numericFilterRules[0].value : (filter as ITableNumericFilter).rule
						} as ITableNumericFilter
					} 
					return newFilter
				}
			})
			return { filters }
		})
	}

	handleChangeFilterRule = (value: any, index: number) => {
		this.setState((state: IState) => {
			return {
				filters: state.filters.map((filter, idx) => {
					return index !== idx ? filter : { ...filter, rule: value }
				})
			}
		})
	}

	handleChangeFilterValue = (value: string, index: number) => {
		this.setState((state: IState) => {
			return {
				filters: state.filters.map((filter, idx) => {
					return index !== idx ? filter : { ...filter, value }
				})
			}
		})
	}

	handleClose = () => {
		this.props.handleFilterClose()
	}

	allFiltersValid = (): boolean => {
		return this.state.filters.length ? (
			this.state.filters.every((filter: ITableFilter) => {
				return filter.value.length > 0
			})
		) : true
	}

	toggleDisabled = () => {
		this.setState((state: IState) => {
			return { disabled: !state.disabled }
		})
	}

	render() {
		const haveFiltersChanged: boolean = this.state.filters.length === this.props.filters.length ? (
			!this.state.filters.every((filter: ITableFilter, index: number) => {
				const propFilter: ITableFilter = this.props.filters[index]
				const fitlerKeys: string[] = Object.keys(propFilter)
				return fitlerKeys.every((key: string) => {
					return filter[key] === propFilter[key]
				})
			}) || this.props.disabled !== this.state.disabled
		) : true

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
						{this.state.filters.map((filter: ITableFilter, idx: number) => {
							const filterRules: Array<StringFilterRule | NumericFilterRule> = filter.type === 'string' ? (
								stringFilterRules
							) : (
								numericFilterRules
							)

							return (
								<li key={idx} className='filter-rule'>
									<Select
										name='id'
										margin='dense'
										value={filter.id}
										onChange={(event: any) => {this.handleChangeFilterID(event.target.value, idx)}}
										disabled={this.state.disabled}
									>
										{this.props.columns.map((column: ITableHeaderColumn, idx: number) => {
											return (
												<MenuItem key={idx} value={column.id}>
													{column.label}
												</MenuItem>
											)
										})}
									</Select>
									<Select
										name='rule'
										margin='dense'
										value={filter.rule}
										onChange={(event: any) => this.handleChangeFilterRule(event.target.value, idx)}
										disabled={this.state.disabled}
									>	
										{filterRules.map((filterRule) => (
											<MenuItem value={filterRule.value} key={filterRule.value}>
												{filterRule.label}
											</MenuItem>
										))}
									</Select>
									<TextField
										variant='standard'
										margin='dense'
										placeholder='Filter value'
										onChange={(event: any) => this.handleChangeFilterValue(event.target.value, idx)}
										value={filter.value}
										disabled={this.state.disabled}
									/>
									<IconButton onClick={() => this.onDuplicateFilter(idx)} disabled={this.state.disabled}>
										<Icon>filter_none</Icon>
									</IconButton>
									<IconButton
										disabled={this.state.filters.length === 1 || this.state.disabled}
										onClick={() => this.onRemoveFilter(idx)}
									><Icon>close</Icon></IconButton>
								</li>
							)
						})}
						{this.state.filters.length > 0 && (
							<li className='filter-rule_placeholder'>
								<IconButton disabled={this.state.disabled} onClick={() => this.onAddFilter()}><Icon>add</Icon></IconButton>
							</li>
						)}
					</ul>
					<div className='filters-actions'>
						<Button variant='text' color='primary' onClick={() => this.onUpdateFilters()}>OK</Button>
						<Button variant='text' color='primary' disabled={!haveFiltersChanged} onClick={() => this.onApplyFilters()}>Apply</Button>
						<Button variant='text' onClick={() => this.onCancelFilters()}>Cancel</Button>
					</div>
					
				</Paper>
			</Grow>
		)
	}
}
