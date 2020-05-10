import { IReduxAction } from '../types/redux'
import { IClassroom, INewClassroom } from '../types/classroom'
import {
    DELETE_CLASSROOM,
    FETCH_CLASSROOMS,
    NEW_CLASSROOM,
    UPDATE_CLASSROOM
} from './types'
import API from '../utils/api'

export const fetchClassrooms = () => {
    return (dispatch: (action: IReduxAction<IClassroom[]>) => void) => {
        return API.get('/classrooms').then((res: any) => {
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
