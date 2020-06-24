import { NextPageContext as DefaultNextPageContext } from 'next'
import { Store } from 'redux'

import { TopicColor } from '../theme'

export interface ReduxAction<T = any> {
    type: string
    payload: T
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export interface NextPageContext extends DefaultNextPageContext {
    store: any
}
