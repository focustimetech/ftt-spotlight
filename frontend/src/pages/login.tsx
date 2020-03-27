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

import { checkUsername, login} from '../actions/authActions'
import { AuthState, AuthUsername, ICredentials, ILoginError, LoginState } from '../types/auth'
import { getObjectFromLocalStorage, REMEMBER_USERS, writeObjectToLocalStorage } from '../utils/storage'
import Carousel, { ICarouselImage } from '../components/Carousel'
import { LoadingButton } from '../components/Form/LoadingButton'

interface IReduxProps {
	settings: any
	checkUsername: (username: string) => Promise<any>
	login: (credentials: ICredentials) => Promise<any>
}

interface IProps extends IReduxProps {
	authState: AuthState
	failedSettings: boolean
	onSignIn: () => Promise<any>
	onImageLoad: () => void
}

interface IState {
	error: ILoginError | null
	helpDialogOpen: boolean
	redirectToReferrer: boolean
	loadingUsername: boolean
	loadingPassword: boolean
	loginState: LoginState
	rememberUser: boolean
	authUsername: AuthUsername
	menuRef: any
	user: string
	password: string
}

class Login extends React.Component<IProps, IState> {
	image: any
	boundingBox: any
	rememberUsers: AuthUsername[]
	state: IState = {
		error: null,
		loadingUsername: false,
		loadingPassword: false,
		loginState: 'password',
		rememberUser: false,
		authUsername: null,
		menuRef: null,
		user: '',
		password: ''
	}

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value,
			error: null
		} as IState)
	}

	handleErrorCode = (errorCode: number) => {
		let loginError: ILoginError = null
		switch (errorCode) {
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

	/**
	 * @TODO Combine these two handlers into one onSubmit function, captured by the <form onSubmit...>
	 */
	handleCheckUsername = (event: any) => {
		event.preventDefault()
		if (!this.validateForm()) {
			return
		}
		this.setState({
			loadingUsername: true,
			bannerOpen: false
		})
		this.props.checkUsername(this.state.user)
			.then((res: any) => {
				const authUsername: AuthUsername = res.data
				this.setState({
					authUsername,
					loadingUsername: false,
					loginState: 'password'
				})
			}, (error: any) => {
				this.handleErrorCode(error.response.status)
				this.setState({ loadingUsername: false })
			})
	}

	handleLogin = (event: any) => {
		event.preventDefault()
		if (!this.validateForm()) {
			return
		}
		this.setState({ loadingPassword: true })
		const credentials: ICredentials = {
			username: this.state.authUsername.username,
			password: this.state.password
		}
		this.props.login(credentials)
			.then(() => {
				this.props.onSignIn()
					.then(() => {
						this.props.onSignIn()
						this.setState({ redirectToReferrer: true })
						if (this.state.rememberUser) {
							this.rememberAuthUsername(this.state.authUsername)
						}
					}, () => {
						const loginError: ILoginError = {
							type: 'username',
							message: 'Unable to download app settings. Please try again.'
						}
						this.setState({
							error: loginError,
							loadingPassword: false
						})
					})
			}, (error: any) => {
				this.handleErrorCode(error.response.status)
				this.setState({ loadingPassword: false })
			})
	}

	validateForm = (): boolean => {
		if (this.state.user.length === 0 && this.state.loginState === 'username') {
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
			rememberUser: !state.rememberUser
		}))
	}

	rememberAuthUsername = (authUsername: AuthUsername) => {
		const otherAuthUsernames: AuthUsername[] = this.rememberUsers ? (
			this.rememberUsers.filter((rememberUser: AuthUsername) => {
				return rememberUser.username !== authUsername.username
			})
		) : []
		const newAuthUsers: AuthUsername[] = [authUsername, ...otherAuthUsernames]
		this.rememberUsers = newAuthUsers
		writeObjectToLocalStorage(REMEMBER_USERS, newAuthUsers)
	}

	forgetAuthUsername = (authUsername: AuthUsername) => {
		const otherAuthUsernames: AuthUsername[] = this.rememberUsers ? (
			this.rememberUsers.filter((rememberUser: AuthUsername) => {
				return rememberUser.username !== authUsername.username
			})
		) : []
		this.rememberUsers = otherAuthUsernames
		writeObjectToLocalStorage(REMEMBER_USERS, otherAuthUsernames)
		if (!(this.rememberUsers && this.rememberUsers.length)) {
			this.resetLoginState()
		} else if (this.state.authUsername.username === authUsername.username) {
			this.setState({ authUsername: otherAuthUsernames[0] })
		} else {
			this.forceUpdate()
		}
	}

	handleOpenMenu = (event: any) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleCloseMenu = () => {
		this.setState({ menuRef: null })
	}

	handleClickAuthUsername = (authUsername: AuthUsername) => {
		this.setState({
			authUsername,
			loginState: 'password',
			menuRef: null
		})
	}

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

	componentDidMount() {
		this.rememberUsers = getObjectFromLocalStorage(REMEMBER_USERS) as AuthUsername[]
		if (this.rememberUsers && this.rememberUsers.length > 0) {
			this.setState({ authUsername: this.rememberUsers[0] })
		} else {
			this.setState({ loginState: 'username' })
		}
	}

	render() {
		const carouselImages: ICarouselImage[] = [
			{ link: '/', src: '/images/splash/brooke-cagle-609873-unsplash.jpg' },
			{ link: '/', src: '/images/splash/helloquence-61189-unsplash.jpg' },
			{ link: '/', src: '/images/splash/john-schnobrich-520023-unsplash.jpg' }
		]
		const schoolName: string = this.props.settings.values && this.props.settings.values['school_name']
			? this.props.settings.values['school_name'].value
			: undefined
		const schoolLogo: string = this.props.settings.values && this.props.settings.values['school_logo']
			? this.props.settings.values['school_logo'].value
			: undefined

		const isRemembered: boolean = this.rememberUsers && this.rememberUsers.some((rememberUser: AuthUsername) => {
			return this.state.authUsername.username === rememberUser.username
		})
		let bannerProps: IBannerContentProps = null
		if (this.props.authState === 'failed-settings') {
			bannerProps = {
				icon: 'warning',
				message: 'The server encountered an error while signing in. Please try again.'
			}
		} else if (this.props.authState === 'unauthenticated') {
			bannerProps = {
				icon: 'lock',
				message: 'Your session has expired. Please sign back in to continue.'
			}
		}

		return (
			<div className='login'>
				<div className='login__container'>
					<h2>Smart attendance for the internet age.</h2>
					<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
					<Paper className='login__paper'>
						<Carousel images={carouselImages} />
						<form className='login__form'>
							<div className='logos-container'>
								<img className='ft-logo' src='/images/ft-badge.png' />
								{(schoolName && schoolLogo) && (
									<>
										<span className='cross'>×</span>
										<div className='school_logo'>
											<img src={`/images/logos/${schoolLogo}`} />
											<h3>{schoolName}</h3>
										</div>
									</>
								)}
							</div>
							<h2>Sign in to Spotlight</h2>
							{(this.state.authUsername || (this.rememberUsers && this.rememberUsers.length > 0)) && (
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
							)}
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
										onChange={this.handleChange}
										margin='normal'
										variant='filled'
										autoFocus
										fullWidth
									/>
									<FormControlLabel
										label='Remember me'
										control={
											<Checkbox
												onChange={() => this.toggleRememberUser()}
												checked={this.state.rememberUser}
												color='primary'
											/>
										}
									/>
									<DialogActions>
										<LoadingButton
											type='submit'
											onClick={this.handleCheckUsername}
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
										onChange={this.handleChange}
										margin='normal'
										variant='filled'
										autoFocus
										fullWidth
									/>
									<DialogActions>
										<Button
											variant='text'
											color='primary'
										>Can't Sign In</Button>
										<LoadingButton
											type='submit'
											onClick={this.handleLogin}
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
const mapDispatchToProps = { login, checkUsername }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
