import React from 'react'

import { connect } from 'react-redux'

import {
	Icon,
	IconButton,
	Tooltip
} from '@material-ui/core'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { createStaff, fetchStaff, IStaffRequest } from '../../actions/staffActions'
import { IStaff } from '../../types/staff'
import { ITableHeaderColumn, ITableLink } from '../../types/table'
import { isEmpty } from '../../utils/utils'

import { StaffInfoDialog } from '../Modals/StaffInfoDialog'
import { EnhancedTable } from '../Table/EnhancedTable'

interface IState {
	addDialogOpen: boolean
	staff: IStaff[]
	loading: boolean
}

interface IReduxProps {
	staff: IStaff[]
	newStaff: IStaff
	createStaff: (staff: IStaffRequest, password: string) => Promise<any>
	fetchStaff: () => Promise<any>
	queueSnackbar: (snackbar: ISnackbar) => void
}

class Staff extends React.Component<IReduxProps, IState> {
	state: IState = {
		staff: [],
		addDialogOpen: false,
		loading: false
	}

	componentDidMount() {
		document.title = 'Staff - Spotlight'
		this.setState({ loading: true })
		this.props.fetchStaff().then(
			(res: any) => {
				this.setState({ loading: false })
			}
		)
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.newStaff && !isEmpty(nextProps.newStaff)) {
			this.props.staff.unshift(nextProps.newStaff)
		}
	}

	onAddDialogOpen = () => {
		this.setState({ addDialogOpen: true })
	}

	onAddDialogClose = () => {
		this.setState({ addDialogOpen: false })
	}

	handleAddStaffSubmit = (event: any, staffDetails: IStaffRequest, password: string): Promise<any> => {
		event.preventDefault()
		return this.props.createStaff(staffDetails, password)
			.then(() => {
				this.props.queueSnackbar({
					message: 'Staff created.',
					links: [{ value: 'See Profile', to: `/staff/${this.props.newStaff.id}` }]
				})
			})
	}

	render() {
		const staff: any[] = this.props.staff.map((staffUser: IStaff, index: number) => {
			return {
				id: index,
				last_name: staffUser.last_name,
				first_name: staffUser.first_name,
				email: staffUser.email,
				profile: staffUser.id
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
			{
				id: 'first_name',
				label: 'First Name',
				disablePadding: true,
				th: true,
				isNumeric: false,
				filterable: true,
				searchable: true,
				visible: true
			},
			{
				id: 'email',
				label: 'Email',
				disablePadding: true,
				th: true,
				isNumeric: false,
				filterable: true,
				searchable: true,
				visible: true
			},
		]

		const tableLink: ITableLink = {label: 'Profile', key: 'profile', path: 'staff'}

		return (
			<div className='content --content-inner' id='content'>
				<StaffInfoDialog
					open={this.state.addDialogOpen}
					onClose={this.onAddDialogClose}
					onSubmit={this.handleAddStaffSubmit}
				/>
				<EnhancedTable
					showEmptyTable={false}
					title='Staff'
					columns={columns}
					data={staff}
					searchable={true}
					loading={this.state.loading}
					link={tableLink}
				>
					<li>
						<Tooltip title='Add Staff'>
							<IconButton onClick={() => this.onAddDialogOpen()}><Icon>add</Icon></IconButton>
						</Tooltip>
					</li>
				</EnhancedTable>

			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	staff: state.staff.items,
	newStaff: state.staff.item
})

const mapDispatchToProps = {
	createStaff,
	fetchStaff,
	queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
