import React from 'react'

import { Fade } from '@material-ui/core'

import LoadingBadge from './LoadingBadge'

interface IProps {
    in: boolean
    children?: any
    showChildren?: boolean
}

export const Splash = (props: IProps) => {
    return (
        <div className='splash' id='splash'>
            <Fade in={props.in} unmountOnExit>
                <div className='splash__inner'>
                    <div className='splash__content'>
                        <LoadingBadge />
                        <Fade in={props.showChildren}>
                            <div>
                                <img className='splash__image_logo' src='/static/images/ft-badge.png'/>
                                {props.children}
                            </div>
                        </Fade>
                    </div>
                </div>
            </Fade>
        </div>
    )
}
