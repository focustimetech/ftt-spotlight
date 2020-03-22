import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const initialState = {}
const middleware = [thunk]

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    // initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
)
