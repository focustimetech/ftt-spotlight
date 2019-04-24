import * as React from 'react'

import {
	Button,
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
} from '../../types/table';

interface FilterType {
	string: StringFilterType[]
	numeric: NumericFilterType[]
}

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

export const EnhancedTableFilter = (props: IProps) => {

	const onAddFilter = () => {
		const newFilter: ITableFilter = {
			...props.filters[props.filters.length - 1],
			value: ''
		}
		props.handleFilterChange(props.filters.concat(newFilter))
	}

	const onRemoveFilter = (index: number) => {
		props.handleFilterChange(props.filters.filter((filter, idx) => {
			return index !== idx
		}))
	}

	const handleFilterChange = (value: string, field: 'rule' | 'value' | 'id', index: number) => {
		const filters: ITableFilter[] = props.filters
		filters[index][field] = value
		props.handleFilterChange(filters)
	}

	const onRemoveAllFilters = () => {
		props.handleFilterChange([])
	}

	return (
		<Paper className='enhanced-table__filters'>
			<h3>Filters</h3>
			{props.filters.length ? (
				<ul>
					{props.filters.map((filter: ITableFilter, idx: number) => {
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
								>{props.columns.map((column: ITableHeaderColumn) => {
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
								>	
									{filterRules.map((filterRule) => (
										<MenuItem value={filterRule.value}>
											{filterRule.label}
										</MenuItem>
									))}
								</Select>
								<TextField
									variant='standard'
								/>
							</li>
						)
					})}
				</ul>
			) : (
				<p>No filters added.</p>
			)}
			<Button onClick={() => onAddFilter()}>Add Filter</Button>
		</Paper>
	)

}