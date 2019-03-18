import '../../assets/styles/main.scss'

import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Content } from '../Content'
import { Dashboard } from '../Dashboard'
import { Sidebar } from '../Sidebar/Sidebar'

import * as classNames from 'classnames'

interface IState {
	menuOpen: boolean
}

interface IProps {}

export default class App extends React.Component<IProps, IState> {
	toggleMenu = (e: any): void => {
		this.setState({ menuOpen: this.state.menuOpen === false })
	}

	componentWillMount() {
		this.state = {
			menuOpen: true
		}
	}

	render() {
		return ( 
			<>
				<div className={classNames('site-wrap', {'--menu_open': this.state.menuOpen})}>
					<Sidebar />
					<Content>
						<Dashboard onMenuClick={this.toggleMenu} />
					</Content>
				</div>
			</>
		)
	}
}