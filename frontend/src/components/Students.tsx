import * as React from 'react'
import axios from 'axios'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableAction, ITableHeaderColumn } from '../types/table'

interface IState {
	/**
	 * @TODO Create typedef for students
	 */
	students: any[]
}

export class Students extends React.Component<{}, IState> {
	state: IState = {
		students: []
	}

	componentDidMount() {
		document.title = 'Students - Spotlight'
		axios.get('http://localhost:8000/api/students')
			.then((res: any) => {
				this.setState({ students: res.data })
			})
	}

	handleCheckIn = (ids: number[]) => {
		// console.log('IDs:', ids)
	}

	render() {
		const students = this.state.students.map((student: any, index: number) => {
			return {
				id: index,
				last_name: student.last_name,
				first_name: student.first_name,
				attendance: 20,
				profile: student.id
			}
		})

		const columns: ITableHeaderColumn[] = [
			{
				id: 'last_name',
				label: 'Last Name',
				th: true,
				isNumeric: false,
				disablePadding: true,
				searchable: true,
				filterable: true,
				visible: true
			},
			{ id: 'first_name', label: 'First Name', disablePadding: true, th: true, isNumeric: false, filterable: true, searchable: true, visible: true},
			{ id: 'attendance', label: 'Attendance', isNumeric: true, visible: true, filterable: true },
			{ id: 'profile', label: 'Profile', isNumeric: false, link: '/students', visible: true, filterable: false},
		]

		const actions: ITableAction[] = [
			{ id: 'check-in', name: 'Check In', action: this.handleCheckIn },
			{ id: 'add-to-cluster', name: 'Add to Cluster', action: this.handleCheckIn },
			{ id: 'delete', name: 'Delete', action: this.handleCheckIn }
		]

		return (
			<>
				<TopNav>
					<ul><h3>Students</h3></ul>
				</TopNav>
				<p>Welcome to the Students page!</p>
				<EnhancedTable title='Students' columns={columns} data={students} actions={actions} searchable={true}/>
			</>
		)
	}
}