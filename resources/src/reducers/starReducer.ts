import { IStarRequest } from '../actions/starActions'
import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from '../actions/types'

export interface IStarredGroup {
    value: string
    label: string
}

export interface IStarredList {
    student?: any[],
    staff?: any[],
    course?: any[],
    cluster?: any[],
    [key: string]: any
}

export const starredGroups: IStarredGroup[] = [
    { value: 'student', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'course', label: 'Courses' },
    { value: 'cluster', label: 'Clusters' },
]

export const emptyStarred: IStarredList = {
    student: [],
    staff: [],
    course: [],
    cluster: [],
}

export interface IStarredItem {
    id?: number,
    item_id: number,
    item_type: string,
    label?: string
    isStarred?: boolean
}

interface IState {
    items: IStarredItem[],
    item: IStarredItem
}

const initialState: IState = {
    items: [],
    item: null
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
                items: state.items.reduce((arr: IStarredItem[], item: IStarredItem) => {
                    arr.push(item.id === action.payload.id ? {
                        ...item,
                        isStarred: true
                    } : item)
                    return arr
                }, []),
                item: {
                    ...action.payload,
                    isStarred: true
                }
            }
        case UNSTAR_ITEM:
            return {
                ...state,
                items: state.items.reduce((arr: IStarredItem[], item: IStarredItem) => {
                    arr.push(item.id === action.payload.id ? {
                        ...item,
                        isStarred: false
                    } : item)
                    return arr
                }, []),
                item: {
                    ...action.payload,
                    isStarred: false
                }
            }
        default:
            return state
    }
}
