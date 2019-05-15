import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from '../actions/types'

export interface IStarredList {
    students: any[],
    staff: any[],
    courses: any[],
    clusters: any[],
    [key: string]: any
}

const emptyStarred: IStarredList = {
    students: [],
    staff: [],
    courses: [],
    clusters: [],
}

interface IState {
    items: IStarredList,
    item: any
}

const initialState: IState = {
    items: emptyStarred,
    item: {}
}

interface IAction {
    type: string,
    payload: any
}

export const starReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STARRED:
            return {
                ...state,
                items: action.payload
            }
        case STAR_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case UNSTAR_ITEM:
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== action.payload)
            }
        default:
            return state
    }
}
