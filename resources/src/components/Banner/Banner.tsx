import * as React from 'react'
import classNames from 'classnames'

import {
    Button,
    Collapse,
    Paper,
    Slide,
    Typography
} from '@material-ui/core'
import { BannerContent, BannerProps } from './BannerContent'

export interface IProps extends BannerProps {
    variant: 'static' | 'dynamic'
    open: boolean
    mountOnEnter?: boolean
    unmountOnExist?: boolean
    onEnter?: () => void
    onEntered?: () => void
    onEntering?: () => void
    onExit?: () => void
    onExited?: () => void
    onExiting?: () => void    
}

class Banner extends React.Component<IProps> {
    render() {
        const { actions, message, icon, open, onClose, ...transitionProps } = this.props
        const Content = () => <BannerContent actions={actions} message={message} icon={icon} onClose={onClose} />
        return this.props.variant === 'static' ? (
            <Collapse in={open} {...transitionProps}>
                <div className={classNames('banner', {['--icon']: icon})}>
                    <Content />
                </div>
            </Collapse>
        ) : (
            <Slide in={open} direction='down' {...transitionProps}>
                <div className={classNames('banner', ' --dynamic', {['--icon']: icon})}>
                    <Paper elevation={5}>
                        <Content />
                    </Paper>
                </div>
            </Slide>
        )
    }
}

export { Banner }
