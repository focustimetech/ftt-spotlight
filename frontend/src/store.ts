import { MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

export type RootState = ReturnType<typeof rootReducer>

const middleware = [thunk]

const composeEnhancers = /* (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose

const makeStore: MakeStore = (initialState: any = {}) => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
        )
    )
}

export default makeStore
