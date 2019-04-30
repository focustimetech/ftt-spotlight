import * as React from 'react'
import axios from 'axios'

import {
	Button,
	Dialog,
	Icon,
	IconButton,
	Menu,
	Select,
	TextField,
	Tooltip
} from '@material-ui/core'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableAction, ITableHeaderColumn } from '../types/table'

interface NewStudent {
	first_name?: string,
	last_name?: string,
	addToClusters: boolean,
	clusters?: Cluster[],
	grade?: number,
	student_number?: number
}

interface Cluster {
	name: string,
	id: number
}

interface IState {
	/**
	 * @TODO Create typedef for students
	 */
	students: any[]
	clusters: Cluster[]
	newStudent: NewStudent
	addDialogVisible: boolean
}

const clusters = [
	{ name: 'Spruce', id: 1 },
	{ name: 'Arbutus', id: 2 },
	{ name: 'Fir', id: 3 }
]

export class Students extends React.Component<{}, IState> {
	state: IState = {
		students: [],
		addDialogVisible: false,
		newStudent: {
			addToClusters: false
		},
		clusters: []
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

	onAddDialogOpen = () => {
		this.setState({ addDialogVisible: true })
	}

	onAddDialogClose = () => {
		this.setState({ addDialogVisible: false })
	}

	handleNewStudentChange = (event: any) => {
		this.setState({ newStudent: {
			...this.state.newStudent,
			[event.target.name]: event.target.value
		}})
	}

	handleAddStudentSubmit = (e: any) => {
		e.preventDefault()
		console.log('submitted form')
		this.onAddDialogClose()
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
					<ul>
						<li><h3>Students</h3></li>
					</ul>
					<ul>
						<li>
							<Tooltip title='Add Student'>
								<IconButton onClick={() => this.onAddDialogOpen()}><Icon>add</Icon></IconButton>
							</Tooltip>
						</li>
					</ul>
				</TopNav>
				<p>Welcome to the Students page!</p>
				<Dialog
					open={this.state.addDialogVisible}
				>
					<h3>Add Student</h3>
					<form className='dialog-form' onSubmit={this.handleAddStudentSubmit}>
						<TextField
							name='first_name'
							value={this.state.newStudent.first_name || ''}
							onChange={this.handleNewStudentChange}
							type='text'
							variant='filled'
						/>
						<TextField
							name='last_name'
							value={this.state.newStudent.last_name || ''}
							onChange={this.handleNewStudentChange}
							type='text'
							variant='filled'
						/>
						<TextField
							name='student_number'
							value={this.state.newStudent.student_number || ''}
							onChange={this.handleNewStudentChange}
							variant='filled'
							type='number'
						/>
						<Select
							multiple
							// value=
						/>
						<div className='dialog-form__button-group'>
							<Button variant='text' onClick={this.onAddDialogClose}>Cancel</Button>
							<Button variant='contained' color='primary' type='submit'>Add Student</Button>
						</div>
					</form>
				</Dialog>
				<EnhancedTable title='Students' columns={columns} data={students} actions={actions} searchable={true}/>
			</>
		)
	}
}