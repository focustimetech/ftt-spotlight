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

import { INavLink, INavMenuItem, TopNav } from '../TopNav'
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
        const searchParams: any = new URLSearchParams(this.props.location.search)
        // console.log('searchParams:', searchParams)
        const searchGroupId: number = parseInt(searchParams.get('groupId'), 10)
        console.log('searchGroupId:', searchGroupId)
        switch (this.props.wikiRoute) {
            case 'none':
                this.fetchWikiGroups()
                break
            case 'group':
                this.fetchWikiGroupPosts(groupId)
                break
            case 'post':
                console.log("case 'post'")
                this.fetchWikiPost(postId)
                    .then(() => {
                        console.log('.THEN()')
                        console.log('this.props.wikiPost:', this.props.wikiPost)
                        if (searchGroupId) {
                            this.setState({
                                post: this.props.wikiPost,
                                group: this.props.wikiPost.groups.find((wikiGroup: IBlogGroup) => wikiGroup.id === searchGroupId)
                            })
                        }
                        this.handleSelectPost(this.props.wikiPost)
                    })
                break
        }
    }

    render() {
        console.log('STATE:', this.state)
        console.log('PROPS:', this.props)
        const breadcrumbs: INavLink[] = [{
            value: 'Spotlight Help',
            to: '/wiki',
            onClick: () => this.fetchWikiGroups()
        }]
        if (this.props.wikiRoute !== 'none' && this.state.group) {
            breadcrumbs.push({
                value: this.state.group.title,
                to: `/wiki/groups/${this.state.group.id}`,
                onClick: () => this.fetchWikiGroupPosts(this.state.group.id)
            })
        }
        if (this.props.wikiRoute === 'post' && this.state.post) {
            let postUrl: string = `/wiki/posts/${this.state.post.id}`
            if (this.state.group) {
                postUrl = `${postUrl}?groupId=${this.state.group.id}`
            } else {
                console.log('initializing menuItems')
                console.log('this.state.post:', this.state.post)
                const menuItems: INavMenuItem[] = this.state.post.groups.map((group: IBlogGroup) => {
                    return { value: group.title, onClick: () => {
                        this.setState({ group })
                        this.props.fetchWikiGroupPosts(group.id)
                        this.props.history.push(`/wiki/groups/${group.id}`)
                    }}
                })
                breadcrumbs.push({ value: '...', menuItems })
            }
            breadcrumbs.push({ value: this.state.post.title, to: postUrl })
        }
        const loading: boolean = this.state.loadingGroupPosts || this.state.loadingGroupPosts || this.state.loadingGroupPosts
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
                                    <Link key={group.id} to={`/wiki/groups/${group.id}`} onClick={() => this.handleSelectGroup(group)}>
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
                                    <Link key={post.id} to={`/wiki/posts/${post.id}?groupId=${this.state.group.id}`} onClick={() => this.handleSelectPost(post)}>
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
