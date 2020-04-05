import { AxiosResponse } from 'axios'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import {
	Avatar,
	Button,
	Checkbox,
	DialogActions,
	FormControlLabel,
	Icon,
	IconButton,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	TextField,
	Typography
} from '@material-ui/core'

import { getAvatar, getCsrfCookie, login } from '../actions/authActions'
import { TopicColor } from '../theme'
import { IAvatar } from '../types'
import { ICredentials } from '../types/auth'
import redirect from '../utils/redirect'

import Carousel, { ICarouselImage } from '../components/Carousel'
import { LoadingButton } from '../components/Form/LoadingButton'
// import API from '../utils/api'

type LoginState = 'username' | 'password'

interface ILoginError {
    type: 'username' | 'password'
    message: string
}

interface IRememberMe {
    username: string
    initials: string
    color: TopicColor
}

interface IReduxProps {
	settings: any
	checkUsername: (username: string) => Promise<any>
	login: (credentials: ICredentials) => Promise<any>
}

interface IProps extends IReduxProps {
	failedSettings: boolean
	onSignIn: () => Promise<any>
	onImageLoad: () => void
}

interface IState {
	avatar: IAvatar
	error: ILoginError
	loadingUsername: boolean
	loadingPassword: boolean
	loginState: LoginState
	rememberMe: boolean
	menuRef: any /** @TODO Change from any */
	user: string
	password: string
}

class Login extends React.Component<IProps, IState> {
	state: IState = {
		avatar: null,
		error: null,
		loadingUsername: false,
		loadingPassword: false,
		loginState: 'username',
		rememberMe: false,
		menuRef: null,
		user: '',
		password: ''
	}

	handleChangeUser = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (this.state.loadingUsername) {
			return
		}
		this.setState({ user: event.target.value, error: null })
	}

	handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (this.state.loadingPassword) {
			return
		}
		this.setState({ password: event.target.value, error: null })
	}

	handleErrorCode = (errorCode: number) => {
		let loginError: ILoginError = null
		switch (errorCode) {
			case 423:
				loginError = {
					type: 'password',
					message: 'Your account has been locked. Please contact your administrator.'
				}
				break
			case 500:
			default:
				loginError = {
					type: 'username',
					message: 'The server encountered an error while logging you in. Please try again.'
				}
		}
		if (loginError) {
			this.setState({ error: loginError })
		}
	}

	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!this.validateForm()) {
			return
		}
		switch (this.state.loginState) {
			case 'username':
				this.setState({ loadingUsername: true })
				getAvatar(this.state.user).then((res: AxiosResponse<IAvatar>) => {
					this.setState({
						avatar: res.data,
						loadingUsername: false,
						loginState: 'password'
					})
				}, () => {
					this.setState({
						loadingUsername: false,
						error: {
							type: 'username',
							message: 'The user could not be found. Please check with your administrator.'
						}
					})
				})
				return
			case 'password':
				this.setState({ loadingPassword: true })
				const credentials: ICredentials = { username: this.state.user, password: this.state.password }
				login(credentials).then((res: AxiosResponse) => {
					this.setState({ loadingPassword: false })
					redirect('/classrooms')
				}, () => {
					this.setState({
						loadingPassword: false,
						error: {
							type: 'password',
							message: 'The given credentials were not correct.'
						}
					})
				})
				return
		}
	}

	validateForm = (): boolean => {
		if (this.state.user.length === 0) {
			this.setState({
				error: { type: 'username', message: 'A username is required to log in.' }
			})
			return false
		}
		if (this.state.password.length === 0 && this.state.loginState === 'password') {
			this.setState({
				error: { type: 'password', message: 'A password is required to log in.' }
			})
			return false
		}
		return true
	}

	resetLoginState = () => {
		this.setState({
			loginState: 'username',
			menuRef: null
		})
	}

	toggleRememberUser = () => {
		this.setState((state: IState) => ({
			rememberMe: !state.rememberMe
		}))
	}

	handleOpenMenu = (event: any) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleCloseMenu = () => {
		this.setState({ menuRef: null })
	}
/*
	rememberUserListItem = (rememberUser: AuthUsername, removable?: boolean) => (
		<MenuItem
			className='auth-username__list-item'
			key={rememberUser.username}
			onClick={() => this.handleClickAuthUsername(rememberUser)}
			dense>
			<Avatar className={classNames('login_avatar', `--${rememberUser.color}`)}>
				{rememberUser.initials}
			</Avatar>
			<ListItemText>{rememberUser.username}</ListItemText>
			{removable !== false && (
				<IconButton onClick={() => this.forgetAuthUsername(rememberUser)}>
					<Icon>delete</Icon>
				</IconButton>
			)}
		</MenuItem>
	)
*/

	componentDidMount() {
		/*
		this.rememberUsers = getObjectFromLocalStorage(REMEMBER_USERS) as AuthUsername[]
		if (this.rememberUsers && this.rememberUsers.length > 0) {
			this.setState({ authUsername: this.rememberUsers[0] })
		} else {
			this.setState({ loginState: 'username' })
		}
		*/
	}

	render() {
		const carouselImages: ICarouselImage[] = [
			{ link: '/', src: '/images/splash/brooke-cagle-609873-unsplash.jpg' },
			{ link: '/', src: '/images/splash/helloquence-61189-unsplash.jpg' },
			{ link: '/', src: '/images/splash/john-schnobrich-520023-unsplash.jpg' }
		]

		return (
			<div className='login'>
				<div className='login__container'>
					<h2>Smart attendance for the internet age.</h2>
					<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
					<Paper className='login__paper'>
						<Carousel images={carouselImages} />
						<form className='login__form' onSubmit={this.onSubmit}>
							<div className='logos-container'>
								<img className='ft-logo' src='/images/ft-badge.png' />
								{/*
									<>
										<span className='cross'>×</span>
										<div className='school_logo'>
											<img src={`/images/logos/${schoolLogo}`} />
											<h3>{schoolName}</h3>
										</div>
									</>
								*/}
							</div>
							<h2>Sign in to Spotlight</h2>
							{/*this.state.avatar && this.state.loginState  (
								<>
									<Button className='auth-username' onClick={this.handleOpenMenu}>
										<div className='auth-username__inner'>
											{this.state.loginState === 'password' && this.state.authUsername ? (
												<>
													<Avatar className={classNames('login_avatar', `--${this.state.authUsername.color}`)}>
														{this.state.authUsername.initials}
													</Avatar>
													<Typography>{this.state.authUsername.username}</Typography>
												</>
											) : (
												<Typography>Sign in with Username</Typography>
											)}
											<Icon>expand_more</Icon>
										</div>
									</Button>
									{(this.state.loginState === 'password' || (this.rememberUsers && this.rememberUsers.length > 0)) && (
										<Menu
											open={Boolean(this.state.menuRef)}
											anchorEl={this.state.menuRef}
											anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
											transformOrigin={{ vertical: 'top', horizontal: 'center' }}
											onClose={this.handleCloseMenu}
										>
											{(!isRemembered && this.state.authUsername) && (
												this.rememberUserListItem(this.state.authUsername, false)
											)}
											{(this.rememberUsers && this.rememberUsers.length) && (
												this.rememberUsers.map((rememberUser: AuthUsername) => this.rememberUserListItem(rememberUser))
											)}
											<MenuItem onClick={() => this.resetLoginState()}>Sign in with Username</MenuItem>
										</Menu>
									)}
								</>
							)*/}
							{this.state.loginState === 'username' && (
								<>
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
										onChange={this.handleChangeUser}
										margin='normal'
										variant='filled'
										autoFocus
										fullWidth
										disabled={this.state.loadingUsername}
									/>
									<FormControlLabel
										label='Remember me'
										control={
											<Checkbox
												onChange={() => this.toggleRememberUser()}
												checked={this.state.rememberMe}
												color='primary'
											/>
										}
									/>
									<DialogActions>
										<LoadingButton
											type='submit'
											color='primary'
											variant='contained'
											loading={this.state.loadingUsername}
										>Next</LoadingButton>
									</DialogActions>
								</>
							)}
							{this.state.loginState === 'password' && (
								<>
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
										onChange={this.handleChangePassword}
										margin='normal'
										variant='filled'
										autoFocus
										fullWidth
									/>
									<DialogActions>
										<LoadingButton
											type='submit'
											color='primary'
											variant='contained'
											loading={this.state.loadingPassword}
										>Sign In</LoadingButton>
									</DialogActions>
								</>
							)}
						</form>
					</Paper>
					<ul className='login__links'>
						<a href='https://focustime.ca'><li>Learn More</li></a>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	settings: state.settings.items
})
const mapDispatchToProps = {} // { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
