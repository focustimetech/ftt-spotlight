import * as React from 'react'

import axios from 'axios'
import ContentLoader from 'react-content-loader'

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Icon,
	IconButton,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Tooltip
} from '@material-ui/core'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableAction, ITableHeaderColumn } from '../types/table'
import { EnhancedDialogTitle } from './Modals/EnhancedDialogTItle';

interface NewStudent {
	first_name: string,
	last_name: string,
	clusters: number[],
	grade: number,
	student_number: string
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
	loading: boolean
	snackbarOpen: boolean
}

const tempClusters = [
	{ name: 'Spruce', id: 1 },
	{ name: 'Arbutus', id: 2 },
	{ name: 'Fir', id: 3 }
]

const grades = [9, 10, 11, 12]

export class Students extends React.Component<{}, IState> {
	state: IState = {
		students: [],
		addDialogVisible: false,
		newStudent: {
			first_name: '',
			last_name: '',
			student_number: '',
			clusters: [],
			grade: grades[0]
		},
		clusters: [],
		loading: false,
		snackbarOpen: false
	}

	componentDidMount() {
		document.title = 'Students - Spotlight'
		this.setState({ loading: true })
		axios.get('http://localhost:8000/api/students')
			.then((res: any) => {
				this.setState({
					students: res.data,
					loading: false
				})
			})
		this.setState({ clusters: tempClusters })
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

		console.log('state:', this.state.newStudent)
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
					scroll='paper'
					aria-labelledby='new-student-dialog-title'
				>
					<EnhancedDialogTitle id='new-student-dialog-title' onClose={this.onAddDialogClose}>Add Student</EnhancedDialogTitle>
					<DialogContent>
						<form className='dialog-form' onSubmit={this.handleAddStudentSubmit} autoComplete='off'>
							<TextField
								name='first_name'
								label='First Name'
								value={this.state.newStudent.first_name}
								onChange={this.handleNewStudentChange}
								className='text-field'
								required
								margin='normal'
								fullWidth
								type='text'
								variant='outlined'
							/>
							<TextField
								name='last_name'
								label='Last Name'
								value={this.state.newStudent.last_name}
								onChange={this.handleNewStudentChange}
								className='text-field'
								required
								margin='normal'
								fullWidth
								type='text'
								variant='outlined'
							/>
							<TextField
								name='student_number'
								label='Student Number'
								value={this.state.newStudent.student_number}
								onChange={this.handleNewStudentChange}
								className='text-field'
								required
								margin='normal'
								fullWidth
								type='text'
								variant='outlined'
							/>
							<FormControl>
								<InputLabel shrink htmlFor='grade'>Grade</InputLabel>
								<Select
									name='grade'
									id='grade'
									onChange={this.handleNewStudentChange}
									value={this.state.newStudent.grade}
									required
								>
									{grades.map((grade: number) => (
										<MenuItem value={grade}>{`Grade ${grade}`}</MenuItem>
									))}
								</Select>
							</FormControl>
							<DialogActions>
								<Button variant='text' onClick={this.onAddDialogClose}>Cancel</Button>
								<Button variant='contained' color='primary' type='submit'>Add Student</Button>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
				<Snackbar
					open={false}
				/>
				<EnhancedTable showEmptyTable={false} title='Students' columns={columns} data={students} actions={actions} searchable={true} loading={this.state.loading} />
			</>
		)
	}
}