// import { MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { rootReducer } from './reducers'

export type RootState = ReturnType<typeof rootReducer>
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

// const middleware = [thunk]

// const composeEnhancers = /* (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose

/*
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
*/

// Creating initial store
export default (initialState: RootState) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    )

    // If reducers were changed, reload with initial state
    /*
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const createNextReducer = require('./reducers').default

            store.replaceReducer(createNextReducer(initialState))
        })
    }
    */

    return store
}
