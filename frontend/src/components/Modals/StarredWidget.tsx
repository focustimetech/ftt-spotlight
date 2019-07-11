import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as classNames from 'classnames'

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

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'
import { fetchStarred, starItem, restarItem, unstarItem } from '../../actions/starActions'
import { StarredList, StarredGroup, StarredItem, starredGroups } from '../../reducers/starReducer'

interface IState {
    open: boolean
    loading: boolean
}

interface ReduxProps {
    fetchStarred: () => any
    starItem: (starredItem: any) => any
    unstarItem: (starredItem: any) => any
    starred: StarredItem[]
    newStarred: StarredItem
}

interface IProps extends ReduxProps {}

class StarredWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state: IState = {
        open: false,
        loading: false
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

    toggleStarred = (event: any, starredItem: StarredItem) => {
        event.preventDefault()
        event.stopPropagation()

        const isStarred: boolean = starredItem.isStarred !== false
        if (isStarred) {
            this.props.unstarItem(starredItem)
        } else {
            this.props.restarItem(starredItem)
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

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.newStarred) {
            const isStarred = nextProps.newStarred.isStarred
            if (isStarred === true || isStarred === false) {
                return
            }
            this.props.starred.unshift(nextProps.newStarred)
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render () {
        console.log('this.props.starred:', this.props.starred)
        const starredCount: number = this.props.starred.length
        let starred: StarredList = {}
        if (this.props.starred) {
            this.props.starred.forEach((starredItem: StarredItem) => {
                if (starred[starredItem.item_type]) {
                    starred[starredItem.item_type].unshift(starredItem)
                } else {
                    starred[starredItem.item_type] = [starredItem]
                }
            })
        }
        return (
            <>
                <NavItem title='Starred' icon='star' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal starred_modal items_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Starred</h3>
                        </div>
                        <div className='sidebar_modal__content starred_modal__content items_modal__content'>
                            <Grow in={!this.state.loading && starredCount > 0} timeout={{enter: 200, exit: 0}}>
                                <div className='content-inner'>
                                    {starredGroups.filter((starredGroup: StarredGroup) => starred[starredGroup.value])
                                        .map((starredGroup: StarredGroup, index: number) => (
                                            <div key={index}>
                                                <h4 className='items-group_header'>{starredGroup.label}</h4>
                                                <List className='items-group_list'>
                                                    {starred[starredGroup.value].map((starredItem: StarredItem, index: number) => {
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
                                                            <Link key={index} to={url} onClick={this.handleClose}>
                                                                <ListItem key={index} className='items-group_list__item'>
                                                                    {starredItem.label}
                                                                    <ListItemSecondaryAction>
                                                                        <IconButton onClick={(event: any) => this.toggleStarred(event, starredItem)}>
                                                                            <Icon className={classNames({'--starred': isStarred})}>{isStarred ? 'star' : 'star_border'}</Icon>
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
                                    <h2>No Starred items found</h2>
                                    <h3>Items you add to your Starred list will appear here.</h3>
                                </EmptyStateIcon>
                            )}
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}

/**
 * @TODO IProps for this....
 */
const mapStateToProps = (state: any) => ({
    starred: state.starred.items,
    newStarred: state.starred.item
})

const mapDispatchToProps = {
    fetchStarred,
    starItem,
    restarItem,
    unstarItem
}
export default connect(mapStateToProps, mapDispatchToProps)(StarredWidget)