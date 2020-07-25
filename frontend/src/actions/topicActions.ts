import { INewCalendarContext } from '../types/calendar'
import { INewClassroom, IClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'
import { ITopic, INewTopic, ITopicSchedule } from '../types/topic'
import { DELETE_TOPIC, FETCH_TOPICS, NEW_TOPIC, NEW_CLASSROOM, UPDATE_CALENDAR_CONTEXT } from './types'
import API from '../utils/api'

export const fetchTopics = () => {
    return (dispatch: (action: IReduxAction<ITopic[]>) => void) => {
        return API.get('/topics').then((res: any) => {
            dispatch({
                type: FETCH_TOPICS,
                payload: res.data
            })
        })
    }
}

export const createTopic = (topic: INewTopic, classroom?: INewClassroom) => {
    const data = classroom ? {
        memo: topic.memo,
        color: topic.color,
        classroomName: classroom.name,
        classroomCapacity: classroom.capacity
    } : topic
    return (dispatch: (action: IReduxAction<ITopic | IClassroom>) => void) => {
        return API.post<ITopic>('/topics', data).then((res) => {
            const topic: ITopic = res.data
            dispatch({
                type: NEW_TOPIC,
                payload: topic
            })

            if (classroom) {
                dispatch({
                    type: NEW_CLASSROOM,
                    payload: { ...classroom, id: topic.classroomId, teacherId: topic.teacherId}
                })
            }
        })
    }
}

export const deleteTopic = (topicId: number) => {
    return (dispatch: (action: IReduxAction<ITopic>) => void) => {
        return API.delete(`/topics/${topicId}`).then((res: any) => {
            dispatch({
                type: DELETE_TOPIC,
                payload: res.data
            })
        })
    }
}

export const createTopicSchedule = (topicSchedule: ITopicSchedule) => {
    const { date, blockId, topic } = topicSchedule
    return (dispatch: (action: IReduxAction<'UPDATE_CALENDAR_CONTEXT', INewCalendarContext>) => void): Promise<any> => {
        dispatch({
            type: UPDATE_CALENDAR_CONTEXT,
            payload: {
                date,
                blockId,
                context: { topic }
            }
        })
        return API.post<void>('/topics/schedule', { date, blockId, topicId: topic.id })
    }
}
