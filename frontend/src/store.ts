import { MakeStore } from 'next-redux-wrapper'
import { Action, applyMiddleware, compose, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { rootReducer } from './reducers'

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

// const middleware = [thunk]

// const composeEnhancers = /* (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose

const makeStore: MakeStore = (initialState: any = {}) => {
    return createStore(
        rootReducer,
        // initialState,
        // composeEnhancers(
            applyMiddleware(thunk),
        // )
    )
}

export default makeStore
