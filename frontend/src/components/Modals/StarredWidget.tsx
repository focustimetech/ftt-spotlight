import * as React from 'react'

import { connect } from 'react-redux'
import { fetchStarred, starItem, unstarItem } from '../../actions/starActions'

import {
    Drawer,
    Icon,
    IconButton,
} from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
    loading: boolean
    starred: any[]
}

interface IProps {
    fetchStarred: () => void
    starred: any[]
}

class StarredWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state: IState = {
        open: false,
        loading: false,
        starred: []
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    escFunction = (event: any) => {
        if (event.keyCode === 27) {
            this.setState({ open: false })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
        this.setState({ loading: true })
        this.props.fetchStarred()
        this.setState({ loading: false })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render () {
        return (
            <>
                <NavItem title='Starred' icon='star' onClick={this.handleClickOpen} />
                <Drawer open={this.state.open}>
					<div className='sidebar_modal starred_modal'>
                        <div className='sidebar_modal__header'>
                            <IconButton className='button_back' onClick={this.handleClose}><Icon>arrow_back</Icon></IconButton>
                            <h3>Starred</h3>
                        </div>
                        <div className='sidebar_modal__content starred_modal__content'>
                            <EmptyStateIcon variant='starred'>
                                <h2>No Starred items found</h2>
                                <h3>Items you add to your Starred list will appear here.</h3>
                            </EmptyStateIcon>
                        </div>
                        <p>{JSON.stringify(this.props.starred)}</p>
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
    newStarredItem: state.starred.item
})

const mapDispatchToProps = {
    fetchStarred,
    starItem,
    unstarItem
}
export default connect(mapStateToProps, mapDispatchToProps)(StarredWidget)