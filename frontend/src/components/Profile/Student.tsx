import * as React from 'react'
import * as classNames from 'classnames'

import {
	Avatar,
	Button,
	Icon,
	IconButton,
	Menu,
	MenuItem,
} from '@material-ui/core'

import { IStudent } from '../../types/student'
import { NameWidget } from './NameWidget'
import { TopNav } from '../TopNav'
import { ITabs } from '../../types/app';
import { Schedule } from '../Schedule'

interface IProps {
	student?: IStudent
}

interface IState {
	student: IStudent
	tab: NavTab
}

type NavTab = 'attendance' | 'schedule' | 'appointments'

export class Student extends React.Component<IProps, IState> {
	state: IState = {
		student: this.props.student || {
			id: 1,
			name: 'Curtis Upshall',
			clusters: [],
			starred: false
		},
		tab: 'schedule'
	}

	handleStarredToggle = () => {
		this.setState((state) => {
			return {
				student: {
					...state.student,
					starred: state.student.starred === false
				}
			}
		}, () => {
			console.log(this.state.student)
		})
	}

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	componentDidMount() {
		// const { match: { params } } = this.props
	}

	render () {
		const starred: boolean = this.state.student.starred
		const navTabs: ITabs = {
			value: this.state.tab,
			onChange: this.handleTabChange,
			tabs: [
				{ value: 'attendance', label: 'Attendance' },
				{ value: 'schedule', label: 'Schedule' },
				{ value: 'appointments', label: 'Appointments' }
			]
		}
		return (
			<div className='profile'>
				<TopNav className='--tabs' tabs={navTabs}>
					<ul>
						<li className='profile_title'>
							<Avatar className='profile_avatar'>CU</Avatar>
							<NameWidget value='Curtis Upshall' />
						</li>
					</ul>
					<ul className='right_col'>
						<li>
							<IconButton onClick={this.handleStarredToggle}>
								<Icon className={classNames({'--starred': starred})}>{starred ? 'star' : 'star_border'}</Icon>
							</IconButton>
						</li>
						<li>
							<IconButton>
								<Icon>more_vert</Icon>
							</IconButton>
						</li>
					</ul>
				</TopNav>
				<Schedule />
			</div>
		)
	}
}