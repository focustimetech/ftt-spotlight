import * as React from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Icon,
    IconButton,
    Snackbar as MuiSnackbar
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

import { ISnackbar, ISnackbarButton, popSnackbar } from '../actions/snackbarActions'

interface ReduxProps {
    currentSnackbar: ISnackbar
    getNextSnackbar: () => void
}

interface IProps extends ReduxProps {}

interface IState {
    open: boolean
}

class Snackbar extends React.Component<IProps, IState> {
    state: IState = {
        open: false
    }
    
    handleExited = () => {
        this.props.getNextSnackbar()
        window.setTimeout(() => this.handleOpen(), 200)
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const snackbar = this.props.currentSnackbar
        const messageStyle: CSSProperties = {
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipses'
        }

        return (
            <MuiSnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={this.state.open}
                onClose={this.handleClose}
                onExited={this.handleExited}
                message={<span style={messageStyle}>{snackbar.message}</span>}
                action={[
                    snackbar.buttons && snackbar.buttons.map((button: ISnackbarButton, index: number) => {
                        const onClick = () => {
                            this.handleClose()
                            button.callback()
                        }
                        return <Button key={index} color='secondary' onClick={onClick}>{button.text}</Button>
                    }),
                    <IconButton onClick={() => this.handleClose()}><Icon>close</Icon></IconButton>
                ]}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({ currentSnackbar: state.snackbar })
const mapDispatchToProps = { popSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)
