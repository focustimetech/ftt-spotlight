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
			{id: 0, name: 'James Smith', first_name: 'James', last_name: 'Smith', attendance: '90.0%', profile: 20},
			{id: 1, name: 'Ryan James', first_name: 'Ryan', last_name: 'James', attendance: '53.4%', profile: 21},
			{id: 2, name: 'Bob Robert', first_name: 'Bob', last_name: 'Robert', attendance: '70.9%', profile: 22},
			{id: 3, name: 'Lisa Redd', first_name: 'Lisa', last_name: 'Redd', attendance: '81.2%', profile: 23},
			{id: 4, name: 'Saul Goodman', first_name: 'Saul', last_name: 'Goodman', attendance: '91.6%', profile: 24},
			{id: 5, name: 'Daniel Keller', first_name: 'Daniel', last_name: 'Keller', attendance: '91.6%', profile: 25},
			{id: 6, name: 'Howard Ferguson', first_name: 'Howard', last_name: 'Furguson', attendance: '90.6%', profile: 26},
			{id: 7, name: 'Joane May', first_name: 'Joane', last_name: 'May', attendance: '45.6%', profile: 27},
			{id: 8, name: 'Kendrick Arlen', first_name: 'Kendrick', last_name: 'Arlen', attendance: '21.2%', profile: 28},
			{id: 9, name: 'Doug Judy', first_name: 'Doug', last_name: 'Judy', attendance: '82.0%', profile: 29},
			{id: 10, name: 'Jackson Ryan', first_name: 'Jackson', last_name: 'Ryan', attendance: '95.5%', profile: 30},
			{id: 11, name: 'Zach Williams', first_name: 'Zach', last_name: 'Williams', attendance: '94.1%', profile: 31},
			{id: 12, name: 'Victor Dennison', first_name: 'Victor', last_name: 'Dennison', attendance: '88.8%', profile: 32},
			{id: 13, name: 'Michael Adib', first_name: 'Michael', last_name: 'Adib', attendance: '92.0%', profile: 33},
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