import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from '../actions/types'
import { StarRequest } from '../actions/starActions'

export interface StarredGroup {
    value: string
    label: string
}

export interface StarredList {
    student?: any[],
    staff?: any[],
    course?: any[],
    cluster?: any[],
    [key: string]: any
}

export const starredGroups: StarredGroup[] = [
    { value: 'student', label: 'Students' },
    { value: 'staff', label: 'Staff' },
    { value: 'course', label: 'Courses' },
    { value: 'cluster', label: 'Clusters' },
]

export const emptyStarred: StarredList = {
    student: [],
    staff: [],
    course: [],
    cluster: [],
}

export interface StarredItem {
    id: number,
    item_id: number,
    item_type: string,
    label: string
    isStarred?: boolean
}

interface IState {
    items: StarredItem[],
    item: StarredItem
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
                items: state.items.reduce((arr: StarredItem[], item: StarredItem) => {
                    arr.push(item.id === action.payload.id ? {
                        ...item,
                        isStarred: true
                    } : item)
                    return arr
                }, []),
                item: action.payload
            }
        case UNSTAR_ITEM:
            return {
                ...state,
                items: state.items.reduce((arr: StarredItem[], item: StarredItem) => {
                    arr.push(item.id === action.payload.id ? {
                        ...item,
                        isStarred: false
                    } : item)
                    return arr
                }, []),
                item: action.payload
            }
        default:
            return state
    }
}
