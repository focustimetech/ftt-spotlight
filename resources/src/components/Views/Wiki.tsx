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

import { TopNav, INavLink } from '../TopNav'

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
    loadingPosts: boolean
    post: IBlogPost
}

class Wiki extends React.Component<IProps, IState> {
    state: IState = {
        group: null,
        loadingGroups: false,
        loadingPosts: false,
        post: null
    }

    handleSelectGroup = (group: IBlogGroup) => {
        this.setState({ loadingPosts: true, group })
        this.props.fetchWikiGroupPosts(group.id)
            .then(() => {
                this.setState({ loadingPosts: false })
            })
    }

    componentDidMount() {
        this.setState({ loadingGroups: true })
        this.props.fetchWikiGroups()
            .then(() => {
                this.setState({ loadingGroups: false })
            })
    }

    render() {
        const breadcrumbs: INavLink[] = [{ value: 'Spotlight Help', to: '/wiki' }]
        if (this.props.wikiRoute !== 'none' && this.state.group) {
            breadcrumbs.push({ value: this.state.group.title, to: `/wiki/groups/${this.state.group.id}` })
        }
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={breadcrumbs} />
                {this.state.loadingGroups ? (
                    <CircularProgress size={48} />
                ) : (
                    this.props.wikiGroups && this.props.wikiGroups.length > 0 ? (
                        <List>
                            {this.props.wikiGroups.map((group: IBlogGroup) => (
                                <Link to={`wiki/groups/${group.id}`} onClick={() => this.handleSelectGroup(group)} key={group.id}>
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
