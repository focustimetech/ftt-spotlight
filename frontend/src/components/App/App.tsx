import '../../assets/styles/main.scss'

import * as React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import { Content } from '../Content'
import { Dashboard } from '../Dashboard'
import { Sidebar } from '../Sidebar/Sidebar'
import { Staff } from '../Staff'
import { TopNav } from '../TopNav'

import * as classNames from 'classnames'

interface IState {
	menuOpen: boolean
}

interface IProps {}

export default class App extends React.Component<IProps, IState> {
	state = {
		menuOpen: true
	}

	toggleMenu = (e: any): void => {
		this.setState({ menuOpen: this.state.menuOpen === false })
	}

	handleViewChange = (): void => {
		return
	}

	render() {
		return ( 
			<>
				<Router>
					<div className={classNames('site-wrap', {'--menu_open': this.state.menuOpen})}>
						<Sidebar />
						<Content>
							<TopNav title='Dashboard' onMenuClick={this.toggleMenu} />
								<Route exact path='/' component={Dashboard} />
								<Route path='/staff' component={Staff} />
						</Content>
					</div>
				</Router>
			</>
		)
	}
}