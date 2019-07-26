import * as React from 'react'

import { connect } from 'react-redux'

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

import { createStudent, fetchStudents } from '../actions/studentActions'
import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

import { ITableAction, ITableHeaderColumn } from '../types/table'
import { EnhancedDialogTitle } from './Modals/EnhancedDialogTitle';
import { ClustersDialog } from './Modals/ClustersDialog';

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

interface ReduxProps {
	students: any[]
	createStudent: (student: any) => any
	fetchStudents: () => any
}

interface IProps extends ReduxProps {}

const tempClusters = [
	{ name: 'Spruce', id: 1 },
	{ name: 'Arbutus', id: 2 },
	{ name: 'Fir', id: 3 }
]

const grades = [9, 10, 11, 12]

class Students extends React.Component<IProps, IState> {
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
		this.props.fetchStudents().then(
			(res: any) => {
				this.setState({ loading: false })
			}
		)
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.newStudent) {
			this.props.students.unshift(nextProps.newStudent)
		}
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
		this.props.createStudent({
			first_name: this.state.newStudent.first_name,
			last_name: this.state.newStudent.last_name,
			student_number: this.state.newStudent.student_number,
			grade: this.state.newStudent.grade,
			initials: 'CU'
		})
		this.onAddDialogClose()
	}

	render() {
		const students = this.props.students.map((student: any, index: number) => {
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
				<EnhancedTable
					showEmptyTable={false}
					title='Students'
					columns={columns}
					data={students}
					actions={actions}
					searchable={true}
					loading={this.state.loading}
				/>
			</>
		)
	}
}

const mapStateToProps = (state: any) => ({
	students: state.students.items,
	newStudent: state.students.item
})

const mapDispatchToProps = {
	createStudent,
	fetchStudents
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)