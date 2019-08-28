import axios from 'axios'

import { FETCH_TOPICS, CREATE_TOPIC, DELETE_TOPIC } from './types'
import { TopicColor } from '../theme'
import { ITopic } from '../types/calendar'

export interface ITopicRequest {
    memo: string
    color: TopicColor
}

export const fetchTopics = () => {
    return (dispatch: any) => {
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
    return (dispatch: any) => {
        return axios.post('/api/topics', topic)
            .then(res => {
                const topic: ITopic = res.data
                dispatch({
                    type: CREATE_TOPIC,
                    payload: topic
                })
            })
    }
}

export const deleteTopic = (topicID: number) => {
    return (dispatch: any) => {
        return axios.post(`/api/topics/${topicID}`)
            .then(res => {
                const topic: ITopic = res.data
                dispatch({
                    type: DELETE_TOPIC,
                    payload: topic
                })
            })
    }
}
