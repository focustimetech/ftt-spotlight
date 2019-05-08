import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

interface Window {
    [key: string]: any
}

const initialState = {}

const middleware = [thunk]

// const enhancer: any = (window as Window)['devToolsExtension'] ? (window as Window)['devToolsExtension']()(createStore) : createStore

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
)