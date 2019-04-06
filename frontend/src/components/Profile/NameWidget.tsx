import * as React from 'react'

import {
	Icon,
	IconButton,
	Tooltip
} from '@material-ui/core'

interface IProps {
	value: string
}

interface IState {
	open: boolean
	value: string | null
}

export class NameWidget extends React.Component<IProps, IState> {
	state: IState = {
		open: false,
		value: null
	}

	handleChange = (event: any) => {
		this.setState({ value: event.target.value })
		if (event.keyCode === 27) {
            this.handleClose()
        }
	}

	handleClickOpen = () => {
		this.setState({ open: true, value: null })
	}

	handleClose = () => {
		console.log('handleClose()')
		this.setState({ open: false, value: null }, () => {
			console.log('handleClose() Widget is ', this.state.open === true ? 'open' : 'closed')
		})
	}

	handleUpdate = () => {
		console.log('handleUpdate()')
		this.handleClose()
	}

	render() {
		console.log('Widget is ', this.state.open === true ? 'open' : 'closed')
		return (
			<div className='name-widget'>
				{this.state.open === true ? (
					<>
						<input value={this.state.value || this.props.value} onChange={this.handleChange} />
						{this.state.value && (
							<ul className='name-widget__actions'>
								<li><Tooltip title='Update'><IconButton onClick={this.handleUpdate}><Icon>check</Icon></IconButton></Tooltip></li>
								<li><Tooltip title='Cancel'><IconButton onClick={this.handleClose}><Icon>close</Icon></IconButton></Tooltip></li>
							</ul>
						)}
					</>
				) : (
					<h3 onClick={this.handleClickOpen}>{this.props.value}</h3>
				)}
			</div>
		)
	}
}