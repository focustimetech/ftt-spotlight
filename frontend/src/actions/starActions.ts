import axios from 'axios'
import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from './types';

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

export const starItem = (item: any) => {
    return (dispatch: any) => {
        return axios.post('http://localhost:8000/api/starred', item)
            .then(res => {
                const item = res.data
                return dispatch({
                    type: STAR_ITEM,
                    payload: item
                })
            })
    }
}

export const unstarItem = (item: any) => {
    return (dispatch: any) => {
        return axios.delete('http://localhost:8000/api/starred', item)
            .then(res => {
                const item = res.data
                return dispatch({
                    type: UNSTAR_ITEM,
                    payload: item
                })
            })
    }
}
