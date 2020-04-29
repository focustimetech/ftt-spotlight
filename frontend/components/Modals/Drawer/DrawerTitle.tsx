import React from 'react'

import {
    Icon,
    IconButton,
    Typography
} from '@material-ui/core'

import Flexbox from '../../Layout/Flexbox'

interface IDrawerTitleProps {
    title?: string
    onClose: () => void
    children?: any
}

class DrawerTitle extends React.Component<IDrawerTitleProps> {
    escFunction = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            this.props.onClose()
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        return (
            <Flexbox className='drawer__title'>
                <IconButton onClick={() => this.props.onClose()}><Icon>arrow_back</Icon></IconButton>
                {this.props.title && (
                    <Typography variant='h6'>{this.props.title}</Typography>
                )}
                {this.props.children && (
                    this.props.children
                )}
            </Flexbox>
        )
    }
}

export { DrawerTitle }
