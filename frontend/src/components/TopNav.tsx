import * as React from 'react'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

interface IProps {
	title: string
	onMenuClick: (e: any) => void
}


const handleChange = (e: any, child: any): void => {
	console.log(child)
}

export class TopNav extends React.Component<IProps> {
	render() {
		return (
			<>
				<div className='top-nav'>
					<IconButton className='top-nav__menu' onClick={this.props.onMenuClick}><Icon>menu</Icon></IconButton>
					<h3>{this.props.title}</h3>
					<Select autoWidth={true} variant='filled' onChange={handleChange}>
						<MenuItem value='day'>Day</MenuItem>
						<MenuItem value='month'>Month</MenuItem>
						<MenuItem value='year'>Year</MenuItem>
					</Select>
				</div>
			</>
		)
	}
}