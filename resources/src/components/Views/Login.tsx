import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import {
	DialogActions,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core'

import { BannerContentProps } from '../Banner/BannerContent'
import { Banner } from '../Banner/Banner'
import { LoadingButton } from '../Form/LoadingButton'
import { AuthState, ICredentials, ILoginError } from '../../types/auth'
import { login } from '../../actions/authActions'

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
	height: number,
	width: number
}

interface ReduxProps {
	settings: any
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
	loading: boolean
	imageURL: string
	imageStatus: 'loading' | 'loaded'
	imageDimensions: Dimensions
	boundingBoxDimension: Dimensions
	bannerOpen: boolean
}

class Login extends React.Component<IProps, IState> {
	image: any
	boundingBox: any
	state: IState = {
		user: '',
		password: '',
		error: null,
		redirectToReferrer: false,
		loading: false,
		imageURL: selectBackground(),
		imageStatus: 'loading',
		imageDimensions: { height: 0, width: 0 },
		boundingBoxDimension: { height: 0, width: 0 },
		bannerOpen: true
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

	handleLogin = (event: any) => {
		event.preventDefault()
		if (!this.validateForm())
			return
		this.setState({
			loading: true,
			bannerOpen: false
		})
		const credentials: ICredentials = {
			username: this.state.user,
			password: this.state.password
		}
		let loginError: ILoginError = null
		this.props.login(credentials)
			.then(() => {
				this.props.onSignIn()
					.then(() => {
						this.props.onSignIn()
						this.setState({ redirectToReferrer: true })
					}, () => {
						loginError = {
							type: 'username',
							message: 'Unable to download app settings. Please try again.'
						}
					})
			}, (error: any) => {
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

	componentDidMount() {
		document.title = 'Spotlight - Login'
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
				</div>
			</>
		)
	}
}

const mapStateToProps = (state: any) => ({
	settings: state.settings.items
})
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
