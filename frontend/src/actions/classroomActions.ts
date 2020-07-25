import { IClassroom, INewClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'
import API from '../utils/api'
import {
    DELETE_CLASSROOM,
    FETCH_CLASSROOMS,
    NEW_CLASSROOM,
    UPDATE_CLASSROOM
} from './types'

export const fetchClassrooms = () => {
    return (dispatch: (action: IReduxAction<IClassroom[]>) => void) => {
        return API.get<IClassroom[]>('/classrooms').then((res) => {
            dispatch({
                type: FETCH_CLASSROOMS,
                payload: res.data
            })
        })
    }
}

export const createClassroom = (classroom: INewClassroom) => {
    return (dispatch: (action: IReduxAction<IClassroom>) => void) => {
        return API.post('/classrooms', classroom).then((res: any) => {
            dispatch({
                type: NEW_CLASSROOM,
                payload: res.data
            })
        })
    }
}

export const deleteClassroom = (classroomId: number) => {
    return (dispatch: (action: IReduxAction<IClassroom>) => void) => {
        return API.delete(`/classrooms/${classroomId}`).then((res: any) => {
            dispatch({
                type: DELETE_CLASSROOM,
                payload: res.data
            })
        })
    }
}
