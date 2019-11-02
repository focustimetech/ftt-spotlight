import classNames from 'classnames'
import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Drawer,
    Fade,
    Grow,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction
} from '@material-ui/core'

import { fetchStarred, starItem, unstarItem } from '../../actions/starActions'
import { IStarredGroup, IStarredItem, IStarredList, starredGroups } from '../../reducers/starReducer'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
    loading: boolean
}

interface IReduxProps {
    fetchStarred: () => any
    starItem: (starredItem: any) => any
    unstarItem: (starredItem: any) => any
    starred: IStarredItem[]
    newIStarred: IStarredItem
}

class IStarredWidget extends React.Component<IReduxProps, IState> {
    state: IState = {
        open: false,
        loading: false
    }

    constructor(props: IReduxProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    fetchStarred = () => {
        this.setState({ loading: true })
        this.props.fetchStarred().then(
            (res: any) => this.setState({ loading: false })
        )
    }

    handleClickOpen = () => {
        this.setState({ open: true })
        this.fetchStarred()
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    toggleIStarred = (event: any, starredItem: IStarredItem) => {
        event.preventDefault()
        event.stopPropagation()
        const isStarred: boolean = starredItem.isStarred !== false
        if (isStarred) {
            this.props.unstarItem(starredItem)
        } else {
            this.props.starItem(starredItem)
        }
    }

    escFunction = (event: any) => {
        if (event.keyCode === 27) {
            this.setState({ open: false })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
        this.fetchStarred()
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        const starredCount: number = this.props.starred.length
        const starred: IStarredList = {}
        if (this.props.starred) {
            this.props.starred.forEach((starredItem: IStarredItem) => {
                if (starred[starredItem.item_type]) {
                    starred[starredItem.item_type].unshift(starredItem)
                } else {
                    starred[starredItem.item_type] = [starredItem]
                }
            })
        }
        return (
            <>
                <NavItem title='IStarred' icon='star' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal starred_modal items_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}>
                                <Icon>arrow_back</Icon>
                            </IconButton>
                            <h3>Starred</h3>
                        </div>
                        <div className='sidebar_modal__content starred_modal__content items_modal__content'>
                            <Grow in={!this.state.loading && starredCount > 0} timeout={{enter: 200, exit: 0}}>
                                <div className='content-inner'>
                                    {starredGroups.filter((starredGroup: IStarredGroup) => starred[starredGroup.value])
                                        .map((starredGroup: IStarredGroup, groupIndex: number) => (
                                            <div key={groupIndex}>
                                                <h4 className='items-group_header'>{starredGroup.label}</h4>
                                                <List className='items-group_list'>
                                                    {starred[starredGroup.value]
                                                        .map((starredItem: IStarredItem, itemIndex: number) => {
                                                        let url: string
                                                        const isStarred = starredItem.isStarred === false ? false : true
                                                        switch (starredGroup.value) {
                                                            case 'student':
                                                                url = `/students/${starredItem.item_id}`
                                                                break
                                                            case 'staff':
                                                                url = `/staff/${starredItem.item_id}`
                                                                break
                                                            case 'course':
                                                                url = `/courses/${starredItem.item_id}`
                                                                break
                                                            case 'cluster':
                                                                url = `/clusters/${starredItem.item_id}`
                                                                break
                                                        }
                                                        return (
                                                            <Link key={itemIndex} to={url} onClick={this.handleClose}>
                                                                <ListItem className='items-group_list__item'>
                                                                    {starredItem.label}
                                                                    <ListItemSecondaryAction className='star'>
                                                                    {/* tslint:disable-next-line: max-line-length */}
                                                                        <IconButton onClick={(event: any) => this.toggleIStarred(event, starredItem)}>
                                                                    {/* tslint:disable-next-line: max-line-length */}
                                                                            <Icon className={classNames({ '--starred': isStarred })}>{isStarred ? 'star' : 'star_border'}</Icon>
                                                                        </IconButton>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>
                                                            </Link>
                                                        )
                                                    })}
                                                </List>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Grow>
                            <Fade in={this.state.loading} timeout={{enter: 200, exit: 0}}>
                                <div className='items_modal__content-loader'>
                                    <ContentLoader width={500} height={436}>
                                        <rect x='64' y='0' rx='4' ry='4' height='24' width='96' />
                                        <rect x='64' y='40' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='84' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='128' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='180' rx='4' ry='4' height='24' width='160' />
                                        <rect x='64' y='220' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='264' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='308' rx='4' ry='4' height='36' width='400' />
                                        <rect x='64' y='360' rx='4' ry='4' height='24' width='80' />
                                        <rect x='64' y='400' rx='4' ry='4' height='36' width='400' />
                                    </ContentLoader>
                                </div>
                            </Fade>
                            {!this.state.loading && starredCount === 0 && (
                                <EmptyStateIcon variant='starred'>
                                    <h2>Your IStarred list is empty</h2>
                                    <h3>Items you add to your IStarred list will appear here.</h3>
                                </EmptyStateIcon>
                            )}
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    starred: state.starred.items,
    newIStarred: state.starred.item
})

const mapDispatchToProps = {
    fetchStarred,
    starItem,
    unstarItem
}

export default connect(mapStateToProps, mapDispatchToProps)(IStarredWidget)
