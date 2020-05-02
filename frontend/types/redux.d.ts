export interface IReduxAction<T = any> {
    type: string
    payload: T
}

export type Dispatch<T = any> = (action: IReduxAction<T>) => void
