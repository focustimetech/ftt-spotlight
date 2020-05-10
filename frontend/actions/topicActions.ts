import { INewClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'
import { ITopic, INewTopic } from '../types/topic'
import { DELETE_TOPIC, DELETE_TOPIC_SCHEDULE, FETCH_TOPICS, NEW_TOPIC, NEW_TOPIC_SCHEDULE } from './types'
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
    return (dispatch: (action: IReduxAction<ITopic>) => void) => {
        return API.post('/topics', data).then((res: any) => {
            dispatch({
                type: NEW_TOPIC,
                payload: res.data
            })
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

/*
export const createTopicSchedule = (topicSchedule: ITopicScheduleRequest) => {
    return (dispatch: (action: ReduxAction<ITopicSchedule>) => void): Promise<any> => {
        return axios.post('/api/topics/schedule', topicSchedule)
            .then((res: any) => {
                const newTopicSchedule: ITopicSchedule = res.data
                dispatch({
                    type: NEW_TOPIC_SCHEDULE,
                    payload: newTopicSchedule
                })
            })
    }
}

export const deleteTopicSchedule = (topicScheduleID: number) => {
    return (dispatch: (action: ReduxAction<ITopicSchedule>) => void): Promise<any> => {
        return axios.delete(`/api/topics/schedule/${topicScheduleID}`)
            .then((res: any) => {
                const topicSchedule: ITopicSchedule = res.data
                dispatch({
                    type: DELETE_TOPIC_SCHEDULE,
                    payload: topicSchedule
                })
            })
    }
}
*/
