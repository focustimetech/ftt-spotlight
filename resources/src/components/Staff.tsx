import * as React from 'react'

import { connect } from 'react-redux'

import {
	Icon,
	IconButton,
	Tooltip
} from '@material-ui/core'

import { createStaff, fetchStaff } from '../actions/staffActions'
import { EnhancedTable } from './Table/EnhancedTable'
import { ITableHeaderColumn, ITableLink } from '../types/table'
import { StaffInfoDialog } from './Modals/StaffInfoDialog'
import { isEmpty } from '../utils/utils'

interface IState {
	/**
	 * @TODO Create typedef for staff?
	 */
	addDialogOpen: boolean
	staff: any[]
	loading: boolean
}

interface ReduxProps {
	staff: any[]
	createStaff: (staff: any) => any
	fetchStaff: () => any
}

interface IProps extends ReduxProps {}

class Staff extends React.Component<IProps, IState> {
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
		if (nextProps.newStudent && !isEmpty(nextProps.newStaff)) {
			this.props.staff.unshift(nextProps.newStaff)
		}
	}

	onAddDialogOpen = () => {
		this.setState({ addDialogOpen: true })
	}

	onAddDialogClose = () => {
		this.setState({ addDialogOpen: false })
	}

	render() {
		const staff = this.props.staff.map((staff: any, index: number) => {
			return {
				id: index,
				last_name: staff.last_name,
				first_name: staff.first_name,
				title: staff.title,
				profile: staff.id
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
			{ id: 'title', label: 'Title', disablePadding: true, th: true, isNumeric: false, filterable: true, searchable: true, visible: true},
		]

		const tableLink: ITableLink = {label: 'Profile', key: 'profile', path: 'staff'}

		return (
			<div className='content --content-inner' id='content'>
				<StaffInfoDialog open={this.state.addDialogOpen} onClose={this.onAddDialogClose} onSubmit={() => {} } />
				<EnhancedTable
					showEmptyTable={false}
					title='Staff'
					columns={columns}
					data={staff}
					searchable={true}
					selectable={false}
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
	fetchStaff
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)