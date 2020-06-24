import { AxiosResponse } from 'axios'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Icon,
    IconButton,
    Snackbar as MuiSnackbar
} from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'

import {
    dequeueSnackbar,
    ISnackbar,
    ISnackbarButton,
    ISnackbarLink,
    queueSnackbar
} from '../actions/snackbarActions'
// import { axios } from '../utils/api'

interface IReduxProps {
    currentSnackbar: ISnackbar
    snackbars: ISnackbar[]
    getNextSnackbar: () => void
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IState {
    open: boolean
}

class Snackbar extends React.Component<IReduxProps, IState> {
    state: IState = {
        open: true
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

    componentWillReceiveProps(nextProps: IReduxProps) {
        if (!nextProps.currentSnackbar) {
            if (nextProps.snackbars.length === 0) {
                return
            }
            this.props.getNextSnackbar()
        }
    }

    componentDidMount() {
        /*
        axios.interceptors.response.use((response: AxiosResponse<any>) => response, (error: any) => {
            if (error.response && error.response.status && error.response.status === 401) {
                console.error("User's session has expired.")
                this.props.queueSnackbar({
                    message: 'Your session has expired. Please log in again.',
                    links: [
                        { value: 'Log in', href: '/login' }
                    ]
                })
            }
            return Promise.reject(error)
        })
        */
    }

    render() {
        const snackbar = this.props.currentSnackbar
        const messageStyle: CSSProperties = {
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipses'
        }

        return !snackbar ? null : (
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
                        return <Button key={index} color='secondary' onClick={onClick}>{button.value}</Button>
                    }),
                    snackbar.links && snackbar.links.map((link: ISnackbarLink, index: number) => (
                        <Link href={link.href} key={index}>
                            <Button color='secondary'>{link.value}</Button>
                        </Link>
                    ))
                ]}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentSnackbar: state.snackbars.item,
    snackbars: state.snackbars.items
})

const mapDispatchToProps = { getNextSnackbar: dequeueSnackbar, queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)
