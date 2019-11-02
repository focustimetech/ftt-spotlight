import React from 'react'

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

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { createStudent, fetchStudents } from '../../actions/studentActions'
import { EnhancedTable } from '../Table/EnhancedTable'
import { ITableAction, ITableHeaderColumn, ITableLink } from '../../types/table'
import { StudentInfoDialog } from '../Modals/StudentInfoDialog'
import { isEmpty } from '../../utils/utils'
import { IStudent } from '../../types/student'

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
	addDialogOpen: boolean
	students: IStudent[]
	clusters: Cluster[]
	loading: boolean
	snackbarOpen: boolean
}

interface ReduxProps {
	students: IStudent[]
	newStudent: IStudent
	createStudent: (student: any) => any
	fetchStudents: () => any
	queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

class Students extends React.Component<IProps, IState> {
	state: IState = {
		students: [],
		addDialogOpen: false,
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
		if (nextProps.newStudent && !isEmpty(nextProps.newStudent)) {
			this.props.students.unshift(nextProps.newStudent)
		}
	}

	onAddDialogOpen = () => {
		this.setState({ addDialogOpen: true })
	}

	onAddDialogClose = () => {
		this.setState({ addDialogOpen: false })
	}


	handleAddStudentSubmit = (event: any, studentDetails: IStudent): Promise<any> => {
		event.preventDefault()
		return this.props.createStudent(studentDetails)
			.then((res: any) => {
				this.props.queueSnackbar({
					message: 'Student created.',
					links: [{ value: 'See Profile', to: `/students/${this.props.newStudent.id}` }]
				})
			})
	}

	render() {
		const students = this.props.students.map((student: any, index: number) => {
			return {
				id: index,
				last_name: student.last_name,
				first_name: student.first_name,
				grade: student.grade,
				class: student.grade >= 11 ? 'Senior' : 'Junior',
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
			{ id: 'grade', label: 'Grade', isNumeric: true, visible: true, filterable: true },
			{ id: 'class', label: 'Class', isNumeric: false, visible: true, filterable: true, values: ['Junior', 'Senior']}
		]

		const tableLink: ITableLink = {label: 'Profile', key: 'profile', path: 'students'}

		return (
			<div className='content --content-inner' id='content'>
				<StudentInfoDialog open={this.state.addDialogOpen} onClose={this.onAddDialogClose} onSubmit={this.handleAddStudentSubmit}/>
				<EnhancedTable
					showEmptyTable={false}
					title='Students'
					columns={columns}
					data={students}
					searchable={true}
					loading={this.state.loading}
					link={tableLink}
				>
					<li>
						<Tooltip title='Add Student'>
							<IconButton onClick={() => this.onAddDialogOpen()}><Icon>add</Icon></IconButton>
						</Tooltip>
					</li>
				</EnhancedTable>

			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	students: state.students.items,
	newStudent: state.students.item
})

const mapDispatchToProps = {
	createStudent,
	fetchStudents,
	queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
