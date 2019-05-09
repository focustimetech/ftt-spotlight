import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const initialState = {}
const middleware = [thunk]

interface IWindow extends Window {
    __REDUX_DEVTOOLS__EXTENSION__: any

}

// const enhancer: any = (window as Window)['devToolsExtension'] ? (window as Window)['devToolsExtension']()(createStore) : createStore

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(
    rootReducer,
    // initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
)