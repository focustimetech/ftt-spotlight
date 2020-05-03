import classNames from 'classnames'
import React from 'react'
import { IAvatar } from '../types/auth';
import { Typography } from '@material-ui/core'

import Avatar from './Avatar'
import Flexbox from './Layout/Flexbox';

interface ITopBarProps {
    title: string
    subtitle?: string
    breadcrumbs?: any
    children?: any
    avatar?: IAvatar
}

const TopBar = (props: ITopBarProps) => {
    return (
        <Flexbox className={classNames('top-bar', { '--breadcrumbs': props.breadcrumbs })}>
            <Flexbox className='top-bar__heading'>
                {props.avatar && (
                    <Avatar size='large' avatar={props.avatar} />
                )}
                <div>
                    <Typography variant='h5'>{props.title}</Typography>
                    <Typography variant='subtitle1'>{props.subtitle}</Typography>
                </div>
            </Flexbox>
            {props.children && (
                <Flexbox className='top-bar__tools'>{props.children}</Flexbox>
            )}
        </Flexbox>
    )
}

export default TopBar
