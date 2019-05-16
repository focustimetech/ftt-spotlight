import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from '../actions/types'

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

const emptyStarred: StarredList = {
    students: [],
    staff: [],
    courses: [],
    clusters: [],
}

interface IState {
    items: StarredList,
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
                item: action.payload
            }
        default:
            return state
    }
}
