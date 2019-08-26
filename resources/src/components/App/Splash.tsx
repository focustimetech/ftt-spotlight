import * as React from 'react'
import { CircularProgress } from '@material-ui/core';

export const Splash = () => {
    return (
        <div className='splash' id='splash'>
            <div className='splash__content'>
                <CircularProgress disableShrink />
                <h3>Loading Spotlight...</h3>
            </div>
        </div>
    )
}