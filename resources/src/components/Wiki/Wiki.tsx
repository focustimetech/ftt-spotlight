import React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom'

import {
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    Typography
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

import { INavLink, TopNav } from '../TopNav'
import WikiPost from './WikiPost'

type WikiRoute = 'none' | 'group' | 'post'

interface IReduxProps {
    wikiGroups: IBlogGroup[]
    wikiPosts: IBlogPost[]
    wikiGroup: IBlogGroup
    wikiPost: IBlogPost
    createWikiGroup: (group: IBlogGroupRequest) => Promise<any>
    createWikiPost: (post: IBlogPostRequest) => Promise<any>
    fetchWikiGroupPosts: (groupId: number) => Promise<any>
    fetchWikiGroups: () => Promise<any>
    fetchWikiPost: (postId: number) => Promise<any>
}

interface IProps extends IReduxProps, RouteComponentProps {
    wikiRoute: WikiRoute
}

interface IState {
    group: IBlogGroup
    loadingGroups: boolean
    loadingGroupPosts: boolean
    loadingPost: boolean
    post: IBlogPost
}

class Wiki extends React.Component<IProps, IState> {
    state: IState = {
        group: null,
        loadingGroups: false,
        loadingGroupPosts: false,
        loadingPost: false,
        post: null
    }

    fetchWikiGroupPosts = (groupId: number): Promise<any> => {
        this.setState({ loadingGroupPosts: true })
        return this.props.fetchWikiGroupPosts(groupId)
            .then(() => {
                this.setState({ loadingGroupPosts: false })
            })
    }

    fetchWikiGroups = (): Promise<any> => {
        this.setState({ loadingGroups: true })
        return this.props.fetchWikiGroups()
            .then(() => {
                this.setState({ loadingGroups: false })
            })
    }

    fetchWikiPost = (postId: number): Promise<any> => {
        this.setState({ loadingPost: true })
        return this.props.fetchWikiPost(postId)
            .then(() => {
                this.setState({ loadingPost: false })
            })
    }

    handleSelectGroup = (group: IBlogGroup) => {
        this.setState({ group })
        this.fetchWikiGroupPosts(group.id)
    }

    handleSelectPost = (post: IBlogPost) => {
        this.setState({ post })
    }

    componentDidMount() {
        const params: any = this.props.match.params
        const { groupId, postId } = params
        switch (this.props.wikiRoute) {
            case 'none':
                this.fetchWikiGroups()
                break
            case 'group':
                this.fetchWikiGroupPosts(groupId)
                break
            case 'post':
                this.fetchWikiPost(postId)
                    .then(() => {
                        //if (this.props.location.search)
                        this.handleSelectPost(this.props.wikiPost)
                    })
                break
        }
    }

    render() {
        console.log('STATE:', this.state)
        console.log('PROPS:', this.props)
        const breadcrumbs: INavLink[] = [{ value: 'Spotlight Help', to: '/wiki' }]
        if (this.props.wikiRoute !== 'none' && this.state.group) {
            breadcrumbs.push({ value: this.state.group.title, to: `/wiki/groups/${this.state.group.id}` })
        }
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={breadcrumbs} />
                {this.props.wikiRoute === 'none' && (
                    this.state.loadingGroups ? (
                        <h6>Loading groups...</h6>
                    ) : (
                        this.props.wikiGroups && this.props.wikiGroups.length > 0 ? (
                            <List>
                                {this.props.wikiGroups.map((group: IBlogGroup) => (
                                    <Link to={`/wiki/groups/${group.id}`} onClick={() => this.handleSelectGroup(group)} key={group.id}>
                                        <ListItem>
                                            <div>
                                                <Typography variant='h6' color='primary'>{group.title}</Typography>
                                                <Typography variant='subtitle1'>{group.subtitle}</Typography>
                                            </div>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        ) : (
                            <p>No Wiki groups were found.</p>
                        )
                    )
                )}
                {this.props.wikiRoute === 'group' && (
                    this.state.loadingGroupPosts ? (
                        <h6>Loading posts...</h6>
                    ) : (
                        this.props.wikiPosts && this.props.wikiPosts.length > 0 ? (
                            <List>
                                {this.props.wikiPosts.map((post: IBlogPost) => (
                                    <Link to={`/wiki/posts/${post.id}?groupId=${this.state.group.id}`} onClick={() => this.handleSelectPost(post)} key={post.id}>
                                        <ListItem>
                                            <div>
                                                <Typography variant='h6' color='primary'>{post.title}</Typography>
                                                <Typography variant='subtitle1'>{post.author.name}</Typography>
                                            </div>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        ) : (
                            <p>No Wiki posts were found.</p>
                        )
                    )
                )}
                {this.props.wikiRoute === 'post' && (
                    this.state.loadingPost ? (
                        <h6>Loading posts...</h6>
                    ) : (
                        this.state.post ? (
                            <WikiPost post={this.state.post} />
                        ) : (
                            <p>No Wiki post selected.</p>
                        )
                    )
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
