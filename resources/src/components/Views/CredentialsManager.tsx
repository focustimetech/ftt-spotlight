import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { resetPasswords, invalidatePasswords, disableUsers, reenableUsers } from '../../actions/authActions'
import { fetchUsers } from '../../actions/userActions'
import { EnhancedTable } from '../Table/EnhancedTable'
import { ConfirmPasswordDialog } from '../Modals/ConfirmPasswordDialog'
import { TopNav } from '../TopNav'
import { ITableHeaderColumn, ITableLink, ITableAction } from '../../types/table'
import { isEmpty } from '../../utils/utils'
import { IUser } from '../../types/auth'

type AuthAction = 'reset-passwords' | 'invalidate-passwords' | 'disable-users' | 'reenable-users'

interface IState {
	authAction: AuthAction
	confirmPasswordDialogOpen: boolean
	loading: boolean
	selected: number[]
}

interface ReduxProps {
	currentUser: IUser
	users: IUser[]
	fetchUsers: () => Promise<any>
	queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends ReduxProps {}

class CredentialsManager extends React.Component<IProps, IState> {
	state: IState = {
		authAction: null,
		confirmPasswordDialogOpen: false,
		loading: false,
		selected: []
	}

	onUsersSelect = (selected: number[]) => {
		this.setState({ selected })
	}

	handleAuthAction = (authAction: AuthAction) => {
		this.setState({
			authAction,
			confirmPasswordDialogOpen: true
		})
	}

	handleCancelAuthAction = () => {
		this.setState({ confirmPasswordDialogOpen: false })
	}

	onSubmitAuthAction = (): Promise<any> => {
		let action: (selected: number[]) => Promise<any>
		let snackbarMessage: string
		switch(this.state.authAction) {
			case 'reset-passwords':
				action = resetPasswords
				snackbarMessage = 'Reset passwords successfully.'
				break
			case 'invalidate-passwords':
				action = invalidatePasswords
				snackbarMessage = 'Invalidated passwords successfully.'
				break
			case 'disable-users':
				action = disableUsers
				snackbarMessage = 'Disabled accounts successfully.'
				break
			case 'reenable-users':
				action = reenableUsers
				snackbarMessage = 'Reenabled accounts successfully.'
				break
		}
		return action(this.state.selected.map((index: number) => this.props.users[index].id))
			.then(() => {
				return this.props.fetchUsers()
					.then(() => {
						this.props.queueSnackbar({ message: snackbarMessage })
					})
			}, (error: any) => {
				console.error(error)
			})
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
		const { currentUser } = this.props
		if (currentUser && (currentUser.account_type === 'student' || (currentUser.account_type === 'staff' && !currentUser.details.administrator))) {
			return <Redirect to='/' />
		}
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
		const allDisabled = this.state.selected.every((id: number) => users[id].status_enum === 'Disabled')
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
			{ id: 'reset-passwords', name: 'Reset Password', callback: () => this.handleAuthAction('reset-passwords')},
			{ id: 'invalidate-passwords', name: 'Invalidate Password', callback: () => this.handleAuthAction('invalidate-passwords')},
			allDisabled
				? { id: 'reenable-users', name: 'Reenable Account', callback: () => this.handleAuthAction('reenable-users')}
				: { id: 'disable-users', name: 'Disable Account', callback: () => this.handleAuthAction('disable-users')}
		]
		if (allDisabled)
			tableActions

		return (
			<div className='content' id='content'>
				<ConfirmPasswordDialog
					open={this.state.confirmPasswordDialogOpen}
					onClose={this.handleCancelAuthAction}
					onVerification={this.onSubmitAuthAction}
					actionItems={['Reset user passwords', 'Invalidate user passwords', 'Re-enable user accounts', 'Disable user accounts']}
				/>
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
					actions={tableActions}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user,
	users: state.users.items,
})

const mapDispatchToProps = {
	fetchUsers,
	queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsManager)
