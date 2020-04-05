import { TopicColor } from '../theme'

export interface ReduxAction<T = any> {
    type: string
    payload: T
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
