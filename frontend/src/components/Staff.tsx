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
			'James', 25, 'Red',
			'Bob', 28, 'Green',
			'Joey', 22, 'Blue'
		]

		const rows: ITableHeaderRow[] = [
			{ id: 'name', label: 'Name', isNumeric: false},
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