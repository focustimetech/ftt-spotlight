import * as React from 'react'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableHeaderRow } from '../types/table'

export class Staff extends React.Component {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
	}

	render() {
		const data = [
			{id: 0, name: 'James', age: 25, color: 'Red'},
			{id: 1, name: 'Ryan', age: 28, color: 'Yellow'},
			{id: 2, name: 'Bob', age: 21, color: 'Green'},
			{id: 3, name: 'Lisa', age: 22, color: 'Blue'},
			{id: 4, name: 'Saul', age: 30, color: 'Brown'},
		]

		const rows: ITableHeaderRow[] = [
			{ id: 'name', label: 'Name', isNumeric: false, disablePadding: true},
			{ id: 'age', label: 'Age', isNumeric: true},
			{ id: 'color', label: 'Color', isNumeric: false}
		]

		return (
			<>
				<TopNav>
					<ul><h3>Staff</h3></ul>
				</TopNav>
				<p>Welcome to the staff page!</p>
				<EnhancedTable rows={rows} data={data} searchable/>
			</>
		)
	}
}