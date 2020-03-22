export interface IReduxAction<T> {
    type: string
    payload: T
}

export type Dispatch<T> = (action: IReduxAction<T>) => void
