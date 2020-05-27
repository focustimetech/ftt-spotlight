import { IBlock } from '../types/calendar'
import { IReduxAction } from '../types/redux'
import API from '../utils/api'
import { FETCH_BLOCKS } from './types'

export const fetchBlocks = () => {
    return (dispatch: (action: IReduxAction<IBlock[]>) => void) => {
        return API.get('/blocks').then((res: any) => {
            dispatch({
                type: FETCH_BLOCKS,
                payload: res.data
            })
        })
    }
}
