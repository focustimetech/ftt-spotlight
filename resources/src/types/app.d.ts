export interface ReduxAction<T> {
    type: string
    payload: T
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
