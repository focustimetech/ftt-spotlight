import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import {
	DialogActions,
	TextField,
} from '@material-ui/core'

import { LoadingButton } from './Form/LoadingButton'
import { ICredentials } from '../types/auth'
import { login } from '../actions/authActions'

const selectBackground = () => {
	const imageList: string[] = [
		'ali-yahya-782497-unsplash.jpg',
		'brooke-cagle-609873-unsplash.jpg',
		'helloquence-61189-unsplash.jpg',
		'john-schnobrich-520023-unsplash.jpg',
		'mimi-thian-737597-unsplash.jpg',
		'mimi-thian-737711-unsplash.jpg',
		'priscilla-du-preez-293218-unsplash.jpg'
	]
	const arrayIndex: number = Math.floor(Math.random() * imageList.length)
	return `url('static/images/splash/${imageList[arrayIndex]}')`
}

interface IProps extends RouteComponentProps {
	onSignIn: () => void
	login: (credentials: ICredentials) => any
}

interface IState {
	user: string
	password: string
	errors: any[]
	redirectToReferrer: boolean
	loading: boolean
}

class Login extends React.Component<IProps, IState> {
	state: IState = {
		user: '',
		password: '',
		errors: [],
		redirectToReferrer: false,
		loading: false
	}

	backgroundImage: string

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value } as IState)
	}
	
	handleLogin = () => {
		this.setState({ loading: true })
		const credentials: ICredentials = {
			username: this.state.user,
			password: this.state.password
		}
		this.props.login(credentials).then(
			(res: any) => {
				this.props.onSignIn()
				this.setState({ redirectToReferrer: true })
			},
			(err: any) => {
				this.setState({ loading: false, errors: err.response.data.errors }, () => null)
			}
		)
	}

	componentDidMount() {
		this.backgroundImage = selectBackground()
		document.title = 'Spotlight - Login'
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
	
		if (this.state.redirectToReferrer) {
			return <Redirect to={from} />
		}
		return (
			<div className='login-wrap'>
				<div className='login'>
					<div className='login__about' style={{backgroundImage: this.backgroundImage}} >
						<a href='https://focustime.ca' className='logo_container'>
							<h1>Spotlight</h1>
						</a>
					</div>
					<div className='login__credentials'>
						<div className='login_container'>
							<h2>Smart attendance for the internet age.</h2>
							<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
							<form className='login_form'>
								<h2>Sign in</h2>
								<TextField
									name='user'
									type='text'
									label='Email or Student Number'
									value={this.state.user}
									onChange={this.handleChange}
									margin='normal'
									variant='filled'
									autoFocus={true}
									fullWidth={true}
								/>
								<TextField
									name='password'
									type='password'
									label='Password'
									value={this.state.password}
									onChange={this.handleChange}
									margin='normal'
									variant='filled'
									fullWidth={true}
								/>
								<DialogActions>
									<LoadingButton
										type='submit'
										onClick={() => this.handleLogin()}
										color='primary'
										variant='contained'
										loading={this.state.loading}
									>Sign In</LoadingButton>
								</DialogActions>
							</form>
							<ul className='links_list'>
								<a href='https://focustime.ca'><li>Help</li></a>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

/**
 * @TODO Make an interface for this stuff...
 */

export default connect(null, { login })(Login);