import axios from 'axios'
import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from './types';

export interface StarRequest {
    item_type: string,
    item_id: number,
}

export interface Starred {
    item_type: string,
    item: any,
    willUpdate?: boolean
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

export const starItem = (starred: Starred) => {
    return (dispatch: any) => {
        const uri = 'http://localhost:8000/api/star'
        const data = { item_type: starred.item_type, item_id: starred.item.id }
        if (starred.willUpdate === false) {
            axios.post(uri, data)
            return dispatch({
                type: STAR_ITEM,
                payload: { item_type: starred.item_type, item: starred.item }
            })
        } else {
            return axios.post(uri, data).then(
                (res: any) => {
                    const item = res.data
                    dispatch({
                        type: STAR_ITEM,
                        payload: { item_type: starred.item_type, item, starred: true }
                    })
                }
            )
        }        
    }
}

export const unstarItem = (starred: Starred) => {
    console.log('unstarring item')
    return (dispatch: any) => {
        const uri = 'http://localhost:8000/api/unstar'
        const data = { item_type: starred.item_type, item_id: starred.item.id }
        if (starred.willUpdate === false) {
            axios.post(uri, data)
            return dispatch({
                type: UNSTAR_ITEM,
                payload: { item_type: starred.item_type, item: starred.item }
            })
        } else {
            return axios.post(uri, data).then(
                (res: any) => {
                    const item = res.data
                    dispatch({
                        type: STAR_ITEM,
                        payload: { item_type: starred.item_type, item, starred: false }
                    })
                }
            )
        }        
    }
}
