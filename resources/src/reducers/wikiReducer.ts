import {
    CREATE_WIKI_GROUP,
    CREATE_WIKI_POST,
    FETCH_WIKI_GROUP_POSTS,
    FETCH_WIKI_GROUPS,
    FETCH_WIKI_POST,
    UPDATE_WIKI_GROUP,
    UPDATE_WIKI_POST
} from '../actions/types'
import { Dispatch, IReduxAction } from '../types/redux'
import {
    IBlogGroup,
    IBlogGroupRequest,
    IBlogPost,
    IBlogPostRequest
} from '../types/wiki'

interface IState {
    post: IBlogPost
    group: IBlogGroup
    posts: IBlogPost[]
    groups: IBlogGroup[]
}

const initialSate: IState = {
    post: null,
    group: null,
    posts: [],
    groups: []
}

export const wikiReducer = (state = initialSate, action: IReduxAction<any>): IState => {
    switch (action.type) {
        case CREATE_WIKI_GROUP:
            return { ...state, groups: [...state.groups, action.payload], group: action.payload }
        case CREATE_WIKI_POST:
            return { ...state, posts: [...state.posts, action.payload], post: action.payload }
        case FETCH_WIKI_GROUP_POSTS:
            return state
        case FETCH_WIKI_GROUPS:
            return state
        case FETCH_WIKI_POST:
            return state
        case UPDATE_WIKI_GROUP:
            return state
        case UPDATE_WIKI_POST:
            return state
        default:
            return state
    }
}
