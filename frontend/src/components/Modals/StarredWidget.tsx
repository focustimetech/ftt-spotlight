import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as classNames from 'classnames'
import { fetchStarred, starItem, StarRequest, unstarItem } from '../../actions/starActions'

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
import { StarredList, StarredGroup, starredGroups } from '../../reducers/starReducer'

interface IState {
    open: boolean
    loading: boolean
}

interface ReduxProps {
    fetchStarred: () => any
    starItem: (starredItem: any) => any
    unstarItem: (starredItem: any) => any
    starred: StarredList
    newStarred: any
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

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    toggleStarred = (event: any, itemGroup: string, item: any) => {
        event.preventDefault()
        event.stopPropagation()

        const isStarred: boolean = item.starred !== false
        
        const starredItem = { item_type: itemGroup, item, willUpdate: false }
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
        this.setState({ loading: true })
        this.props.fetchStarred().then(
            (res: any) => this.setState({ loading: false })
        )
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.newStarred) {
            if (nextProps.newStarred.starred) {
                // Append newly starred item,
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render () {
        console.log(this.props.starred)
        const starredCount: number = this.props.starred ? (
            starredGroups.reduce((count: number, itemGroup: StarredGroup) => {
                return count + this.props.starred[itemGroup.value] ? this.props.starred[itemGroup.value].length : 0
            }, 0)
        ) : 0

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
                                    {starredGroups.filter((starredGroup: StarredGroup) => this.props.starred[starredGroup.value])
                                        .map((starredGroup: StarredGroup, index: number) => (
                                            <div key={index}>
                                                <h4 className='items-group_header'>{starredGroup.label}</h4>
                                                <List className='items-group_list'>
                                                    {this.props.starred[starredGroup.value].map((item: any, index: number) => {
                                                        let url: string
                                                        let value: string
                                                        // const item = starred.item
                                                        switch (starredGroup.value) {
                                                            case 'student':
                                                                value = `${item.first_name} ${item.last_name}`
                                                                url = `/students/${item.id}`
                                                                break
                                                            case 'staff':
                                                                value = `${item.title} ${item.last_name}, ${item.first_name}`
                                                                url = `/staff/${item.id}`
                                                                break
                                                            case 'course':
                                                                value = item.name
                                                                url = `/courses/${item.short_name}`
                                                                break
                                                            case 'cluster':
                                                                value = item.name
                                                                url = `/clusters/${item.id}`
                                                                break
                                                        }
                                                        return (
                                                            <Link key={index} to={url} onClick={this.handleClose}>
                                                                <ListItem key={index} className='items-group_list__item'>
                                                                    {value}
                                                                    <ListItemSecondaryAction>
                                                                        <IconButton onClick={(event: any) => this.toggleStarred(event, starredGroup.value, item.id)}>
                                                                            <Icon className={classNames({'--starred': true})}>{'star'}</Icon>
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
    unstarItem
}
export default connect(mapStateToProps, mapDispatchToProps)(StarredWidget)