import * as React from 'react'

import {
	Button,
	Icon,
	IconButton,
	MenuItem,
	Paper,
	Select,
	TextField
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
	filters: ITableFilter[]
	columns: ITableHeaderColumn[]
	handleFilterChange: (filters: ITableFilter[]) => void
}

interface IState {
	filters: ITableFilter[]
}

/**
 * @TODO MSeparate the handleFilterChange into 3 methods.
 */
export class EnhancedTableFilter extends React.Component<IProps, IState> {
	state: IState = {
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

	onRemoveAllFilters = () => {
		this.setState({ filters: [] })
	}

	render() {
		return (
			<Paper className='enhanced-table__filters'>
				<h3>Filters</h3>
				{this.state.filters.length ? (
					<ul>
						{this.state.filters.map((filter: ITableFilter, idx: number) => {
							const filterRules: Array<StringFilterRule | NumericFilterRule> = filter.type === 'string' ? (
								stringFilterRules
							) : (
								numericFilterRules
							)
							return (
								<li key={idx}>
									<Select
										name='id'
										value={filter.id}
										onChange={(event: any) => {handleFilterChange(event.target.value, 'id', idx)}}
									>
										{this.props.columns.map((column: ITableHeaderColumn) => {
											return (
												<MenuItem value={column.id}>
													{column.label}
												</MenuItem>
											)
										})}
									</Select>
									<Select
										name='rule'
										value={filter.rule}
										onChange={(event: any) => {handleFilterChange(event.target.value, 'rule', idx)}}
									>	
										{filterRules.map((filterRule) => (
											<MenuItem value={filterRule.value}>
												{filterRule.label}
											</MenuItem>
										))}
									</Select>
									<TextField
										variant='standard'
										onChange={(event: any) => {handleFilterChange(event.target.value, 'value', idx)}}
										value={filter.value}
									/>
									<IconButton onClick={() => this.onRemoveFilter(idx)}><Icon>close</Icon></IconButton>
								</li>
							)
						})}
					</ul>
				) : (
					<p>No filters added.</p>
				)}
				<Button onClick={() => this.onAddFilter()}>Add Filter</Button>
			</Paper>
		)
	}

}