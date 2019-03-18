import * as React from 'react'

import { TopNav } from './Topnav'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

interface IProps {
	onMenuClick: (e: any) => void
}

const handleChange = (e: any, child: any): void => {
	console.log(child)
}

export class Dashboard extends React.Component<IProps> {

	render() {
		return (
			<>
				<TopNav title='Dashboard' onMenuClick={this.props.onMenuClick}>
					<Select autoWidth={true} variant='filled' onChange={handleChange}>
						<MenuItem value='day'>Day</MenuItem>
						<MenuItem value='month'>Month</MenuItem>
						<MenuItem value='year'>Year</MenuItem>
					</Select>
				</TopNav>
				<p>Welcome to my Dashboard!</p>
			</>
		)
	}
}