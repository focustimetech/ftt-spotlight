import axios from 'axios'
import { IStarredItem } from '../reducers/starReducer'
import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from './types'

export interface IStarRequest {
    item_type: string,
    item_id: number,
}

export const fetchStarred = () => {
    return (dispatch: any) => {
        return axios.get('/api/starred')
            .then((res: any) => {
                const starred = res.data
                dispatch({
                    type: FETCH_STARRED,
                    payload: starred
                })
            })
    }
}

export const starItem = (starred: IStarredItem) => {
    return (dispatch: any) => {
        const uri = '/api/star'
        axios.post(uri, starred)
        return dispatch({
            type: STAR_ITEM,
            payload: starred
        })
    }
}

export const unstarItem = (starred: IStarRequest) => {
    return (dispatch: any) => {
        const uri = '/api/unstar'
        axios.post(uri, starred)
        return dispatch({
            type: UNSTAR_ITEM,
            payload: starred
        })
    }
}
