import * as React from 'react'
import { connect } from 'react-redux'

import {
	Icon,
	IconButton,
	Tooltip
} from '@material-ui/core'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { fetchUsers } from '../../actions/userActions'
import { EnhancedTable } from '../Table/EnhancedTable'
import { TopNav } from '../TopNav'
import { ITableHeaderColumn, ITableLink, ITableAction } from '../../types/table'
import { isEmpty } from '../../utils/utils'
import { IUser } from '../../types/auth'

interface IState {
	loading: boolean
	selected: number[]
}

interface ReduxProps {
	users: IUser[]
	fetchUsers: () => Promise<any>
	queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

class CredentialsManager extends React.Component<IProps, IState> {
	state: IState = {
		loading: false,
		selected: []
	}

	onUsersSelect = (selected: number[]) => {
		this.setState({ selected })
	}

	handlePasswordResets = (selected: number[]) => {
		
	}

	componentDidMount() {
		document.title = 'Credentials Manager - Spotlight'
		this.setState({ loading: true })
		this.props.fetchUsers()
			.then(() => {
					this.setState({ loading: false })
				})
	}

	render() {
		const users = this.props.users.map((user: IUser, index: number) => {
			return {
				id: index,
				name: user.details.name,
				first_name: user.details.first_name,
				last_name: user.details.last_name,
				status: user.status,
				status_enum: user.status === 'Active' ? 'Active' : 'Disabled',
				password_status: user.password_expired ? 'Expired' : 'Valid',
				account_type: user.display_role
			}
		})
		const columns: ITableHeaderColumn[] = [
			{ id: 'name', label: 'Name', th: true, isNumeric: false, disablePadding: true, searchable: false, filterable: false, visible: true },
			{ id: 'first_name', label: 'First name', isNumeric: false, searchable: true, filterable: true, visible: false },
			{ id: 'last_name', label: 'Last name', isNumeric: false, searchable: true, filterable: true, visible: false },
			{ id: 'status', label: 'Account status', isNumeric: false, disablePadding: true, th: true, searchable: false, filterable: false, visible: true },
			{ id: 'status_enum', label: 'Account status', isNumeric: false, searchable: false, filterable: true, visible: false, values: ['Active', 'Disabled'] },
			{ id: 'password_status', label: 'Password status', isNumeric: false, disablePadding: true, th: true, searchable: false, filterable: true, visible: true, values: ['Valid', 'Expired'] },
			{ id: 'account_type', label: 'Account type', isNumeric: false, disablePadding: true, th: true, searchable: false, filterable: true, visible: true, values: ['Student', 'Teacher', 'Administrator'] },	
		]

		const tableActions: ITableAction[] = [
			{ id: 'reset-password', name: 'Reset Password', action: this.handlePasswordResets}
		]

		return (
			<div className='content' id='content'>
				<TopNav
					breadcrumbs={[{ value: 'Credentials Manager' }]}
				/>
				<EnhancedTable
					showEmptyTable={false}
					title='Users'
					columns={columns}
					data={users}
					searchable={true}
					loading={this.state.loading}
					selected={this.state.selected}
					onSelect={this.onUsersSelect}
					defaultRowsPerPage={10}
					// link={tableLink}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	users: state.users.items,
})

const mapDispatchToProps = {
	fetchUsers,
	queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsManager)
