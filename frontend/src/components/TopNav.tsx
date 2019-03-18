import * as React from 'react'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

interface IProps {
	title: string
	onMenuClick: (e: any) => void
}

export class TopNav extends React.Component<IProps> {
	render() {
		return (
			<>
				<div className='top-nav'>
					<IconButton className='top-nav__menu' onClick={this.props.onMenuClick}><Icon>menu</Icon></IconButton>
					<h3>{this.props.title}</h3>
					{this.props.children}
				</div>
			</>
		)
	}
}