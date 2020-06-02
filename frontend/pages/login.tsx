import { AxiosResponse } from 'axios'
import classNames from 'classnames'
import { Router, withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

import {
	Button,
	Checkbox,
	FormControlLabel,
	Icon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	TextField,
	Typography
} from '@material-ui/core'

import { dispatchCurrentUser, getAvatar, login } from '../actions/authActions'
import { NextPageContext } from '../types'
import { IAvatar, ICredentials } from '../types/auth'
import { getObjectFromLocalStorage, writeObjectToLocalStorage } from '../utils/localStorage'
import redirect from '../utils/redirect'

// import Carousel, { ICarouselImage } from '../components/Carousel'
import Avatar from '../components/Avatar'
import Form from '../components/Form'
import ButtonSelect from '../components/Form/Components/ButtonSelect'
import { LoadingButton } from '../components/Form/Components/LoadingButton'
import Flexbox from '../components/Layout/Flexbox'
import SwipeableViews from 'react-swipeable-views'

const REMEMBER_USERS = 'REMEMBER_USERS'
const LAST_LOGIN_USER = 'LAST_LOGIN_USER'

interface ILoginError {
    type: 'username' | 'password'
    message: string
}

interface IRememberMe {
    username: string
    initials: string
    color: string
}

interface IRouterProps {
	router: Router
}

interface IReduxProps {
	settings: any
	dispatchCurrentUser: () => Promise<any>
	checkUsername: (username: string) => Promise<any>
	login: (credentials: ICredentials) => Promise<any>
}

interface ILoginProps extends IReduxProps, IRouterProps {
	failedSettings: boolean
	onSignIn: () => Promise<any>
	onImageLoad: () => void
}

interface ILoginState {
	avatar: IAvatar
	error: ILoginError
	loadingUsername: boolean
	loadingNextPage: boolean
	loadingPassword: boolean
	currentUser: IRememberMe
	rememberMe: boolean
	menuRef: any /** @TODO Change from any */
	user: string
	password: string
}

class Login extends React.Component<ILoginProps, ILoginState> {
	static getInitialProps = async (context: NextPageContext) => {
		const { store } = context
		const isServer: boolean = typeof window === 'undefined'
		await store.dispatch(dispatchCurrentUser()).then(() => {
			if (store.getState().auth.user) {
				redirect('/', isServer ? context : undefined)
			}
			return {}
		}, (error: any) => {
			return {}
		})
	}

	state: ILoginState = {
		avatar: null,
		error: null,
		loadingUsername: false,
		loadingNextPage: false,
		loadingPassword: false,
		rememberMe: false,
		currentUser: null,
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

	isVerifying = (): boolean => {
		return Boolean(this.props.router.query.u)
	}

	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!this.validateForm()) {
			return
		}
		const credentials: ICredentials = { username: this.state.user, password: this.state.password }
		if (this.isVerifying()) {
			this.setState({ loadingPassword: true })
			this.props.login(credentials).then(() => {
				this.setState({ loadingPassword: false, loadingNextPage: true }, () => {
					redirect('/')
				})
			}, () => {
				this.setState({
					loadingPassword: false,
					error: {
						type: 'password',
						message: 'The given credentials were not correct.'
					}
				})
			})
		} else {
			this.setState({ loadingUsername: true })
			getAvatar(this.state.user).then((res: AxiosResponse<IAvatar>) => {
				this.props.router.push(`/login?u=${credentials.username}`, undefined, { shallow: true })
				this.setState({
					currentUser: { ...res.data, username: credentials.username },
					loadingUsername: false
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
		}
	}

	validateForm = (): boolean => {
		if (this.state.user.length === 0) {
			this.setState({
				error: { type: 'username', message: 'A username is required to log in.' }
			})
			return false
		}
		if (this.state.password.length === 0 && this.isVerifying()) {
			this.setState({
				error: { type: 'password', message: 'A password is required to log in.' }
			})
			return false
		}
		return true
	}

	resetLoginState = () => {
		this.props.router.push('/login', undefined, { shallow: true })
		this.setState({ menuRef: null })
	}

	toggleRememberUser = () => {
		this.setState((state: ILoginState) => ({
			rememberMe: !state.rememberMe
		}))
	}

	handleOpenMenu = (event: any) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleCloseMenu = () => {
		this.setState({ menuRef: null })
	}

	handleClickRememberUser = (user: IRememberMe) => {
		this.setState({ currentUser: user })
		this.props.router.push(`/login?u=${user.username}`)
	}

	getRememberUsers = (): IRememberMe[] => {
		try {
			return getObjectFromLocalStorage<IRememberMe[]>(REMEMBER_USERS) || []
		} catch (e) {
			return []
		}
	}

	componentDidMount() {
		const rememberUsers: IRememberMe[] = this.getRememberUsers()
		let currentUser: IRememberMe = rememberUsers.find((user: IRememberMe) => {
			return user.username === this.props.router.query.u as string
		})
		if (!currentUser) {
			this.props.router.push('/login')
			const lastUser: IRememberMe = rememberUsers.find((user: IRememberMe) => {
				return user.username === getObjectFromLocalStorage<string>(LAST_LOGIN_USER)
			})
			if (lastUser) {
				currentUser = lastUser
			} else if (rememberUsers.length > 0) {
				currentUser = rememberUsers[0]
			}
		}
		this.setState({ currentUser })
	}

	render() {
		/*
		const carouselImages: ICarouselImage[] = [
			{ link: '/', src: '/images/splash/brooke-cagle-609873-unsplash.jpg' },
			{ link: '/', src: '/images/splash/helloquence-61189-unsplash.jpg' },
			{ link: '/', src: '/images/splash/john-schnobrich-520023-unsplash.jpg' }
		]
		*/
		const { currentUser } = this.state
		const rememberUsers: IRememberMe[] = this.getRememberUsers()

		return (
			<div className='login'>
				<div className='login__container'>
					<Typography variant='h4'>Smart attendance for the internet age.</Typography>
					<a href='https://focustime.ca' className='subtitle_link'>
						<Typography variant='subtitle1'>Start using powerful tools that let your self directed study blocks succeed.</Typography>
					</a>
					<Paper className='login__paper'>
						<Form className='login__form' onSubmit={this.onSubmit}>
							<div className='logos-container'>
								<img className='ft-logo' src='/images/ft-badge.png' />
								<span className='cross'>×</span>
								<div className='school_logo'>
									<img src={`/images/logos/school.png`} />
									<Typography variant='h6'>Test School</Typography>
								</div>
							</div>
							<Typography variant='h5' className='login__heading'>Sign in to Spotlight</Typography>
							<ButtonSelect
								className='auth-username'
								onClick={this.handleOpenMenu}
								open={Boolean(this.state.menuRef)}
								disabled={rememberUsers.length === 0 && !currentUser}
							>
								<div className='auth-username__inner'>
									{currentUser && this.isVerifying() ? (
										<>
											<Avatar size='medium' avatar={{ initials: currentUser.initials, color: currentUser.color }} />
											<Typography>{currentUser.username}</Typography>
										</>
									) : (
										<Typography variant='subtitle1'>Sign in with Username</Typography>
									)}
								</div>
							</ButtonSelect>
							<Menu
								open={Boolean(this.state.menuRef)}
								anchorEl={this.state.menuRef}
								anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
								transformOrigin={{ vertical: 'top', horizontal: 'center' }}
								getContentAnchorEl={null}
								onClose={this.handleCloseMenu}
							>
								{rememberUsers.map((user: IRememberMe) => (
									<MenuItem
										className='flexbox'
										key={user.username}
										onClick={() => this.handleClickRememberUser(user)}
										dense
									>
										<Avatar size='medium' avatar={{ initials: user.initials, color: user.color }} />
										<ListItemText>{user.username}</ListItemText>
									</MenuItem>
								))}
								<MenuItem onClick={() => this.resetLoginState()}>Sign in with Username</MenuItem>
							</Menu>
							<SwipeableViews index={this.isVerifying() ? 1 : 0}>
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
									<Flexbox>
										<LoadingButton
											type='submit'
											color='primary'
											variant='contained'
											loading={this.state.loadingUsername}
										>Next</LoadingButton>
									</Flexbox>
								</>
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
									<Flexbox>
										<LoadingButton
											type='submit'
											color='primary'
											variant='contained'
											loading={this.state.loadingPassword || this.state.loadingNextPage}
										>Sign In</LoadingButton>
									</Flexbox>
								</>
							</SwipeableViews>
						</Form>
					</Paper>
					<ul className='login__links'>
						<a href='https://focustime.ca'><li><Typography>Learn More</Typography></li></a>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	settings: state.settings.items
})
const mapDispatchToProps = { dispatchCurrentUser, login }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
