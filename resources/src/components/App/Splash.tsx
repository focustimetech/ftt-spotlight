import * as React from 'react'
import { CircularProgress, Fade } from '@material-ui/core';

import ChangePasswordWidget from '../Modals/ChangePasswordWidget'
import LoadingBadge from './LoadingBadge'

interface IProps {
    in: boolean
    children?: any
    showChildren?: boolean
}

export const Splash = (props: IProps) => {
    console.log('splash.showChildren:', props.showChildren)
    return (
        <div className='splash' id='splash'>
            <Fade in={props.in} unmountOnExit>
                <div className='splash__inner'>
                    <div className='splash__content'>
                        <LoadingBadge />
                        <Fade in={props.showChildren}>
                            <div>
                                {props.children}
                            </div>
                        </Fade>
                    </div>
                </div>
            </Fade>

        </div>
    )
}
