import * as React from 'react'

import {
    Button,
    Icon,
    IconButton
} from '@material-ui/core'

interface IProps {}

export const FileInput = (props: IProps) => {

    return (
        <div className='file-input'>
            <input type='file'></input>
        </div>
    )
}