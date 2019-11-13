import React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import {
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem
} from '@material-ui/core'

import {
    createWikiGroup,
    createWikiPost,
    fetchWikiGroupPosts,
    fetchWikiGroups,
    fetchWikiPost
} from '../../actions/wikiActions'
import {
    IBlogGroup,
    IBlogGroupRequest,
    IBlogPost,
    IBlogPostRequest
} from '../../types/wiki'

import { TopNav } from '../TopNav'

interface IReduxProps {
    wikiGroups: IBlogGroup[]
    wikiPosts: IBlogPost[]
    wikiGroup: IBlogGroup
    wikiPost: IBlogPost
    createWikiGroup: (group: IBlogGroupRequest) => Promise<any>
    createWikiPost: (post: IBlogPostRequest) => Promise<any>
    fetchWikiGroupPosts: () => Promise<any>
    fetchWikiGroups: () => Promise<any>
    fetchWikiPost: () => Promise<any>
}

interface IState {
    groupId: string
    loadingGroups: boolean
    loadingPosts: boolean
    postId: string
}

class Wiki extends React.Component<IReduxProps, IState> {
    state: IState = {
        groupId: null,
        loadingGroups: false,
        loadingPosts: false,
        postId: null
    }

    componentDidMount() {
        this.setState({ loadingGroups: true })
        this.props.fetchWikiGroups()
            .then(() => {
                this.setState({ loadingGroups: false })
            })
    }

    render() {
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Spotlight Help', to: '/wiki' }]} />
                {this.state.loadingGroups && (
                    <CircularProgress size={48} />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    wikiGroups: state.wiki.groups,
    wikiPosts: state.wiki.posts,
    wikiGroup: state.wiki.group,
    wikiPost: state.wiki.post
})

const mapDispatchToProps = {
    createWikiGroup,
    createWikiPost,
    fetchWikiGroupPosts,
    fetchWikiGroups,
    fetchWikiPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Wiki)
