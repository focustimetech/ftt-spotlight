import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'

import { store } from './store'
import { theme } from './theme'
import { setJsonHeaders } from './utils/api'
import { setAuthorizationToken } from './utils/setAuthorizationToken'
import { ACCESS_TOKEN } from './utils/storage'

import AppWithAuth from './components/App/AppWithAuth'

setAuthorizationToken(localStorage.getItem(ACCESS_TOKEN))
setJsonHeaders()

ReactDOM.render (
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<AppWithAuth />
		</Provider>
	</ThemeProvider>,
	document.getElementById('app-root')
)
