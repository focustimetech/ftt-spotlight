import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

import { store } from './store'
import AppWithAuth from './components/App/AppWithAuth';
import { setAuthorizationToken } from './utils/setAuthorizationToken';

setAuthorizationToken(localStorage.jwtToken)

ReactDOM.render (
	<Provider store={store}>
		<AppWithAuth />
	</Provider>,
	document.getElementById('app-root')
)