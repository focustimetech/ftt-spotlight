import * as React from 'react'

import {
	Paper
} from '@material-ui/core'

import {
	ITableFilter,
	ITableNumericFilterType,
	ITableStringFilterType,
} from '../../types/table';

interface StringFilterType {
	label: string,
	value: ITableStringFilterType
}

interface NumericFilterType {
	label: string,
	value: ITableNumericFilterType
}

const stringFilterTypes: StringFilterType[] = [
	{ label: 'Equal to', value: 'equal-to' },
	{ label: 'Not equal to', value: 'not-equal-to' },
	{ label: 'Starts with', value: 'starts-with' },
	{ label: 'Ends with', value: 'ends-with' }, 
	{ label: 'Contains', value: 'contains' }
]

const numericFilterTypes: NumericFilterType[] = [
	{ label: 'Less than', value: 'less-than' },
	{ label: 'Greater than', value: 'greater-than' },
	{ label: 'Equal to', value: 'equal-to' },
	{ label: 'Not equal to', value: 'not-equal-to' }
]

interface IProps {
	filters: ITableFilter[]
	handleFilterChange: (filters: ITableFilter[]) => void
}

export const EnhancedTableFilter = (props: IProps) => {

	const onAddFilter = () => {
		const newFilter: ITableFilter = {
			...props.filters[props.filters.length - 1],
			value: ''
		}
		props.handleFilterChange(props.filters.concat(props.filters[props.filters.length - 1]))
	}

	return (
		<Paper>
			<h6>Filters</h6>
		</Paper>
	)

}