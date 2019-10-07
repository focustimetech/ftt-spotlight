import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import {
	Avatar,
	Button,
	Checkbox,
	DialogActions,
	FormControlLabel,
	Icon,
	Menu,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core'

import { REMEMBER_USERS, appendToLocalStorageArray, getObjectFromLocalStorage, writeObjectToLocalStorage } from '../../utils/storage'
import { BannerContentProps } from '../Banner/BannerContent'
import { Banner } from '../Banner/Banner'
import { LoadingButton } from '../Form/LoadingButton'
import { AuthState, AuthUsername, ICredentials, ILoginError, LoginState } from '../../types/auth'
import { login, checkUsername } from '../../actions/authActions'

const selectBackground = () => {
	const imageList: string[] = [
		'brooke-cagle-609873-unsplash.jpg',
		'helloquence-61189-unsplash.jpg',
		'john-schnobrich-520023-unsplash.jpg',
		'mimi-thian-737711-unsplash.jpg',
		'priscilla-du-preez-293218-unsplash.jpg',
		'mika-korhonen-mKi1rfSQwVY-unsplash.jpg',
		'neonbrand-zFSo6bnZJTw-unsplash.jpg'
	]
	const arrayIndex: number = Math.floor(Math.random() * imageList.length)
	return `static/images/splash/${imageList[arrayIndex]}`
}

interface Dimensions {
	height: number
	width: number
}

interface ReduxProps {
	settings: any
	checkUsername: (username: string) => Promise<any>
	login: (credentials: ICredentials) => Promise<any>
}

interface IProps extends ReduxProps, RouteComponentProps {
	authState: AuthState
	failedSettings: boolean
	onSignIn: () => Promise<any>
	onImageLoad: () => void
}

interface IState {
	user: string
	password: string
	error: ILoginError | null
	redirectToReferrer: boolean
	loadingUsername: boolean
	loadingPassword: boolean
	imageURL: string
	imageStatus: 'loading' | 'loaded'
	imageDimensions: Dimensions
	boundingBoxDimension: Dimensions
	bannerOpen: boolean
	loginState: LoginState
	rememberUser: boolean
	authUsername: AuthUsername
}

class Login extends React.Component<IProps, IState> {
	image: any
	boundingBox: any
	rememberUsers: AuthUsername[]
	state: IState = {
		user: '',
		password: '',
		error: null,
		redirectToReferrer: false,
		loadingUsername: false,
		loadingPassword: false,
		imageURL: selectBackground(),
		imageStatus: 'loading',
		imageDimensions: { height: 0, width: 0 },
		boundingBoxDimension: { height: 0, width: 0 },
		bannerOpen: true,
		loginState: 'password',
		rememberUser: false,
		authUsername: null
	}

	handleBannerClose = () => {
		this.setState({ bannerOpen: false })
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
			case 500:
			default:
				loginError = {
					type: 'username',
					message: 'The server encountered an error while logging you in. Please try again.'
				}
		}
		if (loginError)
			this.setState({ error: loginError })
	}

	/**
	 * @TODO Combine these two handlers into one onSubmit function, captured by the <form onSubmit...>
	 */
	handleCheckUsername = (event: any) => {
		event.preventDefault()
		if (!this.validateForm())
			return
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
		if (!this.validateForm())
			return
		this.setState({
			loadingPassword: true,
			bannerOpen: false
		})
		const credentials: ICredentials = {
			username: this.state.user,
			password: this.state.password
		}
		this.props.login(credentials)
			.then(() => {
				this.props.onSignIn()
					.then(() => {
						this.props.onSignIn()
						this.setState({ redirectToReferrer: true })
						this.rememberAuthUsername(this.state.authUsername)
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
			loginState: 'username'		
		})
	}

	handleImageLoad = () => {
		this.setState({
			imageStatus: 'loaded',
			imageDimensions: {
				height: this.image.clientHeight,
				width: this.image.clientWidth
			},
			boundingBoxDimension: {
				height: this.boundingBox.clientHeight,
				width: this.boundingBox.clientWidth
			}
		})
		this.props.onImageLoad()
	}

	toggleRememberUser = () => {
		this.setState((state: IState) => ({
			rememberUser: !state.rememberUser
		}))
	}

	rememberAuthUsername = (authUsername: AuthUsername) => {
		const otherAuthUsernames: AuthUsername[] = this.rememberUsers.filter((rememberUser: AuthUsername) => {
			return rememberUser.username !== authUsername.username
		})
		writeObjectToLocalStorage(REMEMBER_USERS, [authUsername, ...otherAuthUsernames])
	}

	componentDidMount() {
		document.title = 'Spotlight - Login'
		this.rememberUsers = getObjectFromLocalStorage(REMEMBER_USERS) as AuthUsername[]
		if (this.rememberUsers && this.rememberUsers.length > 0)
			this.setState({ authUsername: this.rememberUsers[0] })
		else
			this.setState({ loginState: 'username' })
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		if (this.state.redirectToReferrer)
			return <Redirect to={from} />
		
		const schoolName: string = this.props.settings.values && this.props.settings.values['school_name']
			? this.props.settings.values['school_name'].value
			: undefined
		const schoolLogo: string = this.props.settings.values && this.props.settings.values['school_logo']
			? this.props.settings.values['school_logo'].value
			: undefined
		const isVertical: boolean = this.state.imageDimensions.width < this.state.boundingBoxDimension.width
		let bannerProps: BannerContentProps = null
		if (this.props.authState === 'failed-settings') {
			bannerProps = {
				'icon': 'warning',
				'message': 'The server encountered an error while signing in. Please try again.'
			}
		} else if (this.props.authState === 'unauthenticated') {
			bannerProps = {
				'icon': 'lock',
				'message': 'Your session has expired. Please sign back in to continue.'
			}
		}

		return (
			<>
				{bannerProps && (
					<Banner
						{...bannerProps}
						variant='dynamic'
						open={this.state.bannerOpen}
						onClose={this.handleBannerClose}
					/>
				)}
				<div className='login'>
					<div className='login__image_container' ref={(boundingBox: any) => this.boundingBox = boundingBox}>
						<img
							className={classNames('login_image', {['--vertical']: isVertical})}
							src={this.state.imageURL}
							onLoad={this.handleImageLoad}
							ref={(image: any) => this.image = image}
						/>
					</div>
					<div className='login__panel'>
						<div className='login_container'>
							<h2>Smart attendance for the internet age.</h2>
							<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
							<Paper className='login_form'>
								<form>
									<div className='logos-container'>
										<img className='ft-logo' src='/static/images/ft-badge.png' />
										{(schoolName && schoolLogo) && (
											<>
												<span className='cross'>×</span>
												<div className='school_logo'>
													<img src={`/static/images/logos/${schoolLogo}`} />
													<h3>{schoolName}</h3>
												</div>
											</>
										)}
									</div>
									<h2>Sign in to Spotlight</h2>
									{(this.state.authUsername || (this.rememberUsers && this.rememberUsers.length > 0)) && (
										<Button className='auth-username'>
											{this.state.loginState === 'password' && this.state.authUsername ? (
												<div>
													<Avatar className={classNames('login_avatar', `--${this.state.authUsername.color}`)}>
														{this.state.authUsername.initials}
													</Avatar>
													<Typography>{this.state.authUsername.username}</Typography>
												</div>
											) : (
												<Typography>Select a User</Typography>
											)}
											<Icon>expand_more</Icon>
										</Button>
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
												autoFocus={true}
												fullWidth={true}
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
												fullWidth={true}
											/>
											<DialogActions>
												<Button
													variant='text'
													onClick={() => this.resetLoginState()}
												>Back</Button>
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
							<ul className='links_list'>
								<a href='https://focustime.ca'><li>Learn More</li></a>
							</ul>
						</div>
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state: any) => ({
	settings: state.settings.items
})
const mapDispatchToProps = { login, checkUsername }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
