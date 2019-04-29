import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

import AppWithAuth from './components/App/AppWithAuth';

const store = createStore(
	() => [],
	applyMiddleware(thunk)
)

ReactDOM.render (
	<Provider store={store}>
		<AppWithAuth />
	</Provider>,
	document.getElementById('app-root')
)