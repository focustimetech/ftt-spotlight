import axios, { AxiosResponse } from 'axios'

import { Dispatch, IReduxAction } from '../types/redux'
import {
    IBlogGroup,
    IBlogGroupRequest,
    IBlogPost,
    IBlogPostRequest
} from '../types/wiki'
import {
    CREATE_WIKI_GROUP,
    CREATE_WIKI_POST,
    FETCH_WIKI_GROUP_POSTS,
    FETCH_WIKI_GROUPS,
    FETCH_WIKI_POST,
    UPDATE_WIKI_GROUP,
    UPDATE_WIKI_POST
} from './types'

export const createWikiGroup = (wikiGroup: IBlogGroupRequest) => {
    return (dispatch: Dispatch<IBlogGroup>): Promise<any> => {
        return axios.post('api/wiki/groups')
            .then((res: AxiosResponse<any>) => dispatch({
                type: CREATE_WIKI_GROUP,
                payload: res.data
            }))
    }
}

export const createWikiPost = (wikiPost: IBlogPostRequest) => {
    return (dispatch: Dispatch<IBlogPost>): Promise<any> => {
        return axios.post('api/wiki/posts')
            .then((res: AxiosResponse<any>) => dispatch({
                type: CREATE_WIKI_POST,
                payload: res.data
            }))
    }
}

export const fetchWikiGroupPosts = (groupId: number) => {
    return (dispatch: Dispatch<IBlogPost[]>): Promise<any> => {
        return axios.get(`api/wiki/groups/${groupId}`)
            .then((res: AxiosResponse<any>) => dispatch({
                type: FETCH_WIKI_GROUP_POSTS,
                payload: res.data
            }))
    }
}

export const fetchWikiGroups = () => {
    return (dispatch: Dispatch<IBlogGroup[]>): Promise<any> => {
        return axios.get('api/wiki/groups')
            .then((res: AxiosResponse<any>) => dispatch({
                type: FETCH_WIKI_GROUPS,
                payload: res.data
            }))
    }
}

export const fetchWikiPost = (postId: number) => {
    return (dispatch: Dispatch<IBlogPost>): Promise<any> => {
        return axios.get(`api/wiki/posts/${postId}`)
            .then((res: AxiosResponse<any>) => dispatch({
                type: FETCH_WIKI_POST,
                payload: res.data
            }))
    }
}
