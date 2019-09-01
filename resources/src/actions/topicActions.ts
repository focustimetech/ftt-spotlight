import axios from 'axios'

import { FETCH_TOPICS, NEW_TOPIC_SCHEDULE, NEW_TOPIC, DELETE_TOPIC, DELETE_TOPIC_SCHEDULE } from './types'
import { TopicColor } from '../theme'
import { ITopic, ITopicSchedule } from '../types/calendar'
import { ReduxAction } from '../types/app'

export interface ITopicRequest {
    memo: string
    color: TopicColor
}

export interface ITopicScheduleRequest {
    date: string
    block_id: number
    topic_id: number
}

export const fetchTopics = () => {
    return (dispatch: (action: ReduxAction<ITopic[]>) => void) => {
        return axios.get('/api/topics')
            .then(res => {
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
            .then(res => {
                const topic: ITopic = res.data
                dispatch({
                    type: NEW_TOPIC,
                    payload: topic
                })
            })
    }
}

export const deleteTopic = (topicID: number) => {
    return (dispatch: (action: ReduxAction<ITopic>) => void) => {
        return axios.delete(`/api/topics/${topicID}`)
            .then(res => {
                const topic: ITopic = res.data
                dispatch({
                    type: DELETE_TOPIC,
                    payload: topic
                })
            })
    }
}

export const createTopicSchedule = (topicSchedule: ITopicScheduleRequest) => {
    return (dispatch: (action: ReduxAction<ITopicSchedule>) => void) => {
        return axios.post(`/aip/topics/schedule`, topicSchedule)
            .then(res => {
                const topicSchedule: ITopicSchedule = res.data
                dispatch({
                    type: NEW_TOPIC_SCHEDULE,
                    payload: topicSchedule
                })
            })
    }
}

export const deleteTopicSchedule = (topicScheduleID: number) => {
    return (dispatch: (action: ReduxAction<ITopicSchedule>) => void) => {
        return axios.delete(`/api/topics/schedule/${topicScheduleID}`)
            .then(res => {
                const topicSchedule: ITopicSchedule = res.data
                dispatch({
                    type: DELETE_TOPIC_SCHEDULE,
                    payload: topicSchedule
                })
            })
    }
}
