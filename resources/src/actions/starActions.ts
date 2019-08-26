import axios from 'axios'
import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from './types';
import { StarredItem } from '../reducers/starReducer'

export interface StarRequest {
    item_type: string,
    item_id: number,
}

export const fetchStarred = () => {
    return (dispatch: any) => {
        return axios.get('http://localhost:8000/api/starred')
            .then(res => {
                const starred = res.data
                dispatch({
                    type: FETCH_STARRED,
                    payload: starred
                })
            })
    }
}

export const starItem = (starred: StarredItem) => {
    return (dispatch: any) => {
        const uri = 'http://localhost:8000/api/star'
        axios.post(uri, starred)
        return dispatch({
            type: STAR_ITEM,
            payload: starred
        })
    }
}

export const unstarItem = (starred: StarRequest) => {
    return (dispatch: any) => {
        const uri = 'http://localhost:8000/api/unstar'
        axios.post(uri, starred)
        return dispatch({
            type: UNSTAR_ITEM,
            payload: starred
        })
     
    }
}
