const React = require('react')
const ReactDOM = require('react-dom')

import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import { ACCESS_TOKEN } from './utils/storage'
import { store } from './store'
import { theme } from './theme'
import AppWithAuth from './components/App/AppWithAuth'
import { setAuthorizationToken } from './utils/setAuthorizationToken'

setAuthorizationToken(localStorage.getItem(ACCESS_TOKEN))

ReactDOM.render (
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<AppWithAuth />
		</Provider>
	</ThemeProvider>,
	document.getElementById('app-root')
)
