import * as React from 'react'

import axios from 'axios'
import * as classNames from 'classnames'
import { RouteComponentProps } from 'react-router-dom'

import {
	Avatar,
	Button,
	Icon,
	IconButton
} from '@material-ui/core'

import { IStudent } from '../../types/student'
import { TopNav } from '../TopNav'
import { ITabs } from '../../types/app';
import { Schedule } from '../Schedule'

interface IProps extends RouteComponentProps{
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

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	componentDidMount() {
		const params: any = this.props.match.params
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
							<h3>Curtis Upshall</h3>
						</li>
					</ul>
					<ul className='right_col'>
						<li>
							<IconButton>
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