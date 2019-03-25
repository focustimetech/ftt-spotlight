import * as React from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { NavItem } from '../Sidebar/NavItem'

interface IState {
    open: boolean
}

interface IProps {}

export class StarredWidget extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.escFunction = this.escFunction.bind(this)
    }

    state = {
        open: false
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
                        <div className='sidebar_modal__content'>
                            <p>Couldn't find anything...</p>
                        </div>
					</div>
				</Drawer>
            </>
        )
    }
}