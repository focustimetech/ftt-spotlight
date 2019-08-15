import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import { store } from './store'
import { theme } from './theme'
import AppWithAuth from './components/App/AppWithAuth';
import { setAuthorizationToken } from './utils/setAuthorizationToken';

setAuthorizationToken(localStorage.access_token)

ReactDOM.render (
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<AppWithAuth />
		</Provider>
	</ThemeProvider>,
	document.getElementById('app-root')
)
