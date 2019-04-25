import * as React from 'react'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableHeaderColumn } from '../types/table'

export class Staff extends React.Component {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
	}

	render() {
		const data = [
			{id: 0, name: 'James', attendance: '90.0%', profile: 20},
			{id: 1, name: 'Ryan', attendance: '53.4%', profile: 21},
			{id: 2, name: 'Bob', attendance: '70.9%', profile: 22},
			{id: 3, name: 'Lisa', attendance: '81.2%', profile: 23},
			{id: 4, name: 'Saul', attendance: '91.6%', profile: 24},
			{id: 5, name: 'Daniel', attendance: '91.6%', profile: 25},
			{id: 6, name: 'Howard', attendance: '90.6%', profile: 26},
			{id: 7, name: 'Joane', attendance: '45.6%', profile: 27},
			{id: 8, name: 'Kendrick', attendance: '21.2%', profile: 28},
			{id: 9, name: 'Zach', attendance: '82.0%', profile: 29},
			{id: 10, name: 'Jackson', attendance: '95.5%', profile: 30},
		]

		const columns: ITableHeaderColumn[] = [
			{
				id: 'name',
				label: 'Student',
				th: true,
				isNumeric: false,
				disablePadding: true,
				searchable: true,
				filterable: false,
				visible: true
			},
			{ id: 'attendance', label: 'Attendance', isNumeric: true, visible: true, filterable: true },
			{ id: 'profile', label: 'Profile', isNumeric: false, link: '/student', visible: true, filterable: false},
			{ id: 'first_name', label: 'First Name', isNumeric: false, filterable: true, visible: false},
			{ id: 'last_name', label: 'Last Name', isNumeric: false, filterable: true, visible: false}
		]

		return (
			<>
				<TopNav>
					<ul><h3>Staff</h3></ul>
				</TopNav>
				<p>Welcome to the staff page!</p>
				<EnhancedTable columns={columns} data={data} searchable={true}/>
			</>
		)
	}
}