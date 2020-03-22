import axios from 'axios'

import { TopicColor } from '../theme'
import { ReduxAction } from '../types/app'
import { ITopic, ITopicSchedule } from '../types/calendar'
import { DELETE_TOPIC, DELETE_TOPIC_SCHEDULE, FETCH_TOPICS, NEW_TOPIC, NEW_TOPIC_SCHEDULE } from './types'

export interface ITopicRequest {
    memo: string
    color: TopicColor
    unavailable: boolean
}

export interface ITopicScheduleRequest {
    date: string
    block_id: number
    topic_id: number
}

export const fetchTopics = () => {
    return (dispatch: (action: ReduxAction<ITopic[]>) => void) => {
        return axios.get('/api/topics')
            .then((res: any) => {
                const topics: ITopic[] = res.data
                dispatch({
                    type: FETCH_TOPICS,
                    payload: topics
                })
            })
    }
}

export const createTopic = (topic: ITopicRequest) => {
    return (dispatch: (action: ReduxAction<ITopic>) => void) => {
        return axios.post('/api/topics', topic)
            .then((res: any) => {
                const newTopic: ITopic = res.data
                dispatch({
                    type: NEW_TOPIC,
                    payload: newTopic
                })
            })
    }
}

export const deleteTopic = (topicID: number) => {
    return (dispatch: (action: ReduxAction<ITopic>) => void) => {
        return axios.delete(`/api/topics/${topicID}`)
            .then((res: any) => {
                const deletedTopic: ITopic = res.data
                dispatch({
                    type: DELETE_TOPIC,
                    payload: deletedTopic
                })
            })
    }
}

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
