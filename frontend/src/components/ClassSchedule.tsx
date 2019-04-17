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

//cimport { IStudent } from '../../types/student'
//cimport { NameWidget } from './NameWidget'
import { TopNav } from './TopNav'
import { ITabs } from '../types/app';
import { Schedule } from './Schedule'

interface IState {
	tab: NavTab
}

type NavTab = 'courses' | 'schedule'

export class ClassSchedule extends React.Component<{}, IState> {
	state: IState = {
		tab: 'schedule'
	}

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	render () {
		const navTabs: ITabs = {
			value: this.state.tab,
			onChange: this.handleTabChange,
			tabs: [
				{ value: 'courses', label: 'Courses' },
				{ value: 'schedule', label: 'Class Schedule' },
			]
		}
		return (
			<div className='profile'>
				<TopNav className='--tabs' tabs={navTabs}>
					<ul>
						<h3>Class Schedule</h3>
					</ul>
					<ul className='right_col'>
						<li>
							<IconButton>
								<Icon>add</Icon>
							</IconButton>
						</li>
						<li>
							<IconButton>
								<Icon>more_vert</Icon>
							</IconButton>
						</li>
					</ul>
				</TopNav>
				<BlockSchedule />
			</div>
		)
	}
}