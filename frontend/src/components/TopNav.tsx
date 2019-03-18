import * as React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select'

interface ViewOption {
	value: string
	label: string
}

interface IProps {
	title: string
	onMenuClick: (e: any) => void
	viewOptions?: ViewOption[]
	onViewChange: (e: any) => void
}

interface IState {
	view: string
}

/**
 * TopNav for the main app view. `props.children` Takes `<li>` elements only.
 * @TODO Make the viewSelet prop optional, and do conditional rendering of the Select
 */
export class TopNav extends React.Component<IProps, IState> {
	handleViewChange = (e: any): void =>  {
		this.setState({ view: e.target.value })
		this.props.onViewChange(e.target.value)
	}

	componentWillMount() {
		this.state = {
			view: this.props.viewOptions[0].value
		}
	}

	render() {
		return (
			<>
				<div className='top-nav'>
					<IconButton className='top-nav_menu' onClick={this.props.onMenuClick}><Icon>menu</Icon></IconButton>
					<h3 className='top-nav__title'>{this.props.title}</h3>
					<ul>
						{ this.props.viewOptions.length > 0 && 
							<FormControl variant='outlined'>
								<Select
									value={this.state.view}
									autoWidth={true}
									onChange={this.props.onViewChange}
									input={<OutlinedInput labelWidth={100}/>}
								>
									{this.props.viewOptions.map(view =>
										<MenuItem value={view.value}>{view.label}</MenuItem>
									)}
								</Select>
							</FormControl>
						}
						{this.props.children}
					</ul>
				</div>
			</>
		)
	}
}