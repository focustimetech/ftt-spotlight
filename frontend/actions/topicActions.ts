import { INewClassroom, IClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'
import { ITopic, INewTopic, ITopicSchedule } from '../types/topic'
import { DELETE_TOPIC, DELETE_TOPIC_SCHEDULE, FETCH_TOPICS, NEW_TOPIC, NEW_TOPIC_SCHEDULE, NEW_CLASSROOM } from './types'
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
    return (dispatch: (action: IReduxAction<ITopicSchedule>) => void): Promise<any> => {
        dispatch({
            type: NEW_TOPIC_SCHEDULE,
            payload: topicSchedule
        })
        return API.post<void>('/topics/schedule', topicSchedule)
    }
}

/*
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
