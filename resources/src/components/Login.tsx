import * as React from 'react'
import * as classNames form 'classnames'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import {
	DialogActions,
	Paper,
	TextField,
} from '@material-ui/core'

import { LoadingButton } from './Form/LoadingButton'
import { ICredentials, ILoginError } from '../types/auth'
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

interface ReduxProps {
	login: (credentials: ICredentials) => Promise<any>
}

interface IProps extends ReduxProps, RouteComponentProps {
	onSignIn: () => void
}

interface IState {
	user: string
	password: string
	error: ILoginError | null
	redirectToReferrer: boolean
	loading: boolean
	imageStatus: 'loading' | 'loaded'
}

class Login extends React.Component<IProps, IState> {
	state: IState = {
		user: '',
		password: '',
		error: null,
		redirectToReferrer: false,
		loading: false,
		imageStatus: 'loading'
	}

	backgroundImage: string

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value,
			error: null
		} as IState)
	}

	handleLogin = (event: any) => {
		event.preventDefault()
		if (!this.validateForm())
			return
		this.setState({ loading: true })
		const credentials: ICredentials = {
			username: this.state.user,
			password: this.state.password
		}
		this.props.login(credentials)
			.then(() => {
				this.props.onSignIn()
				this.setState({ redirectToReferrer: true })
			}, (error: any) => {
				let loginError: ILoginError = null
				switch (error.response.status) {
					case 404:
						loginError = {
							type: 'username',
							message: 'The user could not be found. Please check with your administrator.'
						}
						break
					case 401:
						loginError = {
							type: 'password',
							message: 'The given credentials were not correct.'
						}
						break
					case 500:
					default:
						loginError = {
							type: 'username',
							message: 'The server encountered an error while logging you in. Please try again.'
						}
				}
				this.setState({
					loading: false,
					error: loginError
				})
			})
	}

	validateForm = (): boolean => {
		if (this.state.user.length === 0) {
			this.setState({
				error: { type: 'username', message: 'A username is required to log in.' }
			})
			return false
		}
		if (this.state.password.length === 0) {
			this.setState({
				error: { type: 'password', message: 'A password is required to log in.' }
			})
			return false
		}
		return true
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
			<div className='login'>
				<div className='login__image_container'>
					<img className='login_image' src='static/images/splash/ali-yahya-782497-unsplash.jpg' />
				</div>
				<div className='login__container'>
					<h2>Smart attendance for the internet age.</h2>
					<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
					<Paper className='login_form'>
						<form>
							<h2>Sign in</h2>
							<TextField
								name='user'
								type='text'
								label='Email or Student Number'
								error={this.state.error && this.state.error.type === 'username'}
								helperText={
									this.state.error && this.state.error.type === 'username'
										? this.state.error.message
										: undefined
								}
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
								error={this.state.error && this.state.error.type === 'password'}
								helperText={
									this.state.error && this.state.error.type === 'password'
										? this.state.error.message
										: undefined
								}
								value={this.state.password}
								onChange={this.handleChange}
								margin='normal'
								variant='filled'
								fullWidth={true}
							/>
							<DialogActions>
								<LoadingButton
									type='submit'
									onClick={this.handleLogin}
									color='primary'
									variant='contained'
									loading={this.state.loading}
								>Sign In</LoadingButton>
							</DialogActions>
						</form>
					</Paper>
					<ul className='links_list'>
						<a href='https://focustime.ca'><li>Learn More</li></a>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({})
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
