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
    loadingGroups: boolean
    loadingGroupPosts: boolean
    loadingPost: boolean
}

class Wiki extends React.Component<IProps, IState> {
    state: IState = {
        loadingGroups: false,
        loadingGroupPosts: false,
        loadingPost: false,
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

    componentDidMount() {
        this.fetchWikiGroups()
        const params: any = this.props.match.params
        const groupId: number = parseInt(params.groupId, 10) || null
        const postId: number = parseInt(params.postId, 10) || null
        console.log('Params:', params)
        const searchParams: any = new URLSearchParams(this.props.location.search)

        if (this.props.wikiRoute === 'group') {
            this.fetchWikiGroupPosts(groupId)
        } else if (this.props.wikiRoute === 'post') {
            this.fetchWikiPost(postId)
        }
    }

    render() {
        const params: any = this.props.match.params
        const urlGroupId: number = parseInt(params.groupId, 10) || null
        const loadingGroupPosts: boolean = this.state.loadingGroups || this.state.loadingGroupPosts
        const loadingPost: boolean = this.state.loadingGroups || this.state.loadingPost
        const wikiGroup = this.props.wikiGroups.find((group: IBlogGroup) => {
            return this.props.wikiRoute === 'group'
                ? group.id === urlGroupId
                : this.props.wikiPost && group.id === this.props.wikiPost.group_id
        })
        const breadcrumbs: INavLink[] = [{
            value: 'Spotlight Help',
            to: '/wiki'
        }]
        if (this.props.wikiRoute !== 'none' ) {
            if (wikiGroup && !this.state.loadingGroups) {
                breadcrumbs.push({
                    value: wikiGroup.title,
                    to: `/wiki/${wikiGroup.id}`,
                    onClick: this.props.wikiPosts
                        ? undefined
                        : () => this.fetchWikiGroupPosts(wikiGroup.id)
                })
            }
        }
        if (this.props.wikiRoute === 'post') {
            if (this.props.wikiPost && !loadingPost && !this.state.loadingGroups) {
                breadcrumbs.push({
                    value: this.props.wikiPost.title,
                    to: `/wiki/post/${this.props.wikiPost.id}`
                })
            }
        }
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={breadcrumbs} />
                {this.props.wikiRoute === 'none' && (
                    this.state.loadingGroups ? (
                        <div style={{ width: 800, height: 800 }}>
                            <ContentLoader width={800} height={800}>
                                <rect rx={4} ry={4} y={32} x={16} height={28} width={250} />
                                <rect rx={4} ry={4} y={68} x={16} height={18} width={320} />
                                <rect rx={4} ry={4} y={104} x={16} height={28} width={220} />
                                <rect rx={4} ry={4} y={140} x={16} height={18} width={120} />
                                <rect rx={4} ry={4} y={176} x={16} height={28} width={320} />
                                <rect rx={4} ry={4} y={212} x={16} height={18} width={160} />
                                <rect rx={4} ry={4} y={248} x={16} height={28} width={165} />
                                <rect rx={4} ry={4} y={284} x={16} height={18} width={365} />
                                <rect rx={4} ry={4} y={320} x={16} height={28} width={195} />
                                <rect rx={4} ry={4} y={356} x={16} height={18} width={435} />
                            </ContentLoader>
                        </div>
                    ) : (
                        this.props.wikiGroups && this.props.wikiGroups.length > 0 ? (
                            <List>
                                {this.props.wikiGroups.map((group: IBlogGroup) => (
                                    <Link key={group.id} to={`/wiki/${group.id}`} onClick={() => this.fetchWikiGroupPosts(group.id)}>
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
                        <div style={{ width: 800, height: 800 }}>
                            <ContentLoader width={800} height={800}>
                                <rect rx={4} ry={4} y={32} x={16} height={28} width={250} />
                                <rect rx={4} ry={4} y={68} x={16} height={18} width={320} />
                                <rect rx={4} ry={4} y={104} x={16} height={28} width={220} />
                                <rect rx={4} ry={4} y={140} x={16} height={18} width={120} />
                                <rect rx={4} ry={4} y={176} x={16} height={28} width={320} />
                                <rect rx={4} ry={4} y={212} x={16} height={18} width={160} />
                                <rect rx={4} ry={4} y={248} x={16} height={28} width={165} />
                                <rect rx={4} ry={4} y={284} x={16} height={18} width={365} />
                                <rect rx={4} ry={4} y={320} x={16} height={28} width={195} />
                                <rect rx={4} ry={4} y={356} x={16} height={18} width={435} />
                            </ContentLoader>
                        </div>
                    ) : (
                        this.props.wikiPosts && this.props.wikiPosts.length > 0 ? (
                            <List>
                                {this.props.wikiPosts.map((post: IBlogPost) => (
                                    <Link key={post.id} to={`/wiki/post/${post.id}`} onClick={() => this.fetchWikiPost(post.id)}>
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
                    loadingPost ? (
                        <div style={{ width: 800, height: 800 }}>
                            <ContentLoader width={800} height={800}>
                                <rect rx={4} ry={4} y={32} x={16} height={36} width={320} />
                                <rect rx={4} ry={4} y={118} x={16} height={18} width={220} />
                                <rect rx={4} ry={4} y={144} x={48} height={18} width={300} />
                                <rect rx={4} ry={4} y={170} x={16} height={18} width={220} />
                                <rect rx={4} ry={4} y={196} x={56} height={18} width={120} />
                                <rect rx={4} ry={4} y={196} x={200} height={18} width={48} />
                                <rect rx={4} ry={4} y={222} x={16} height={18} width={300} />
                                <rect rx={4} ry={4} y={248} x={16} height={18} width={500} />
                                <rect rx={4} ry={4} y={274} x={16} height={18} width={470} />
                                <rect rx={4} ry={4} y={300} x={70} height={18} width={450} />
                                <rect rx={4} ry={4} y={326} x={32} height={18} width={300} />
                                <rect rx={4} ry={4} y={352} x={16} height={18} width={250} />
                            </ContentLoader>
                        </div>
                    ) : (
                        this.props.wikiPost ? (
                            <WikiPost post={this.props.wikiPost} />
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
