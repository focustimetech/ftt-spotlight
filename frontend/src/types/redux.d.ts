export interface IReduxAction<T = string, P = any> {
    type: T
    payload: P
}

export type Dispatch<T = any> = (action: IReduxAction<T>) => void
