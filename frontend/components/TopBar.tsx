import classNames from 'classnames'
import React from 'react'

import { Tab, Tabs, Typography } from '@material-ui/core'

import { IAvatar } from '../types/auth';
import Avatar from './Avatar'
import Flexbox from './Layout/Flexbox';

export interface ITabs {
    tabs: string[]
    value: number
    onChange: (value: number) => void
}

interface ITopBarProps {
    title: string
    titleAdornment?: React.ReactNode
    subtitle?: string
    breadcrumbs?: any
    children?: any
    avatar?: IAvatar
    tabs?: ITabs
}

const TopBar = (props: ITopBarProps) => {
    return (
        <div className={classNames('top-bar', { '--breadcrumbs': props.breadcrumbs }, { '--tabs': props.tabs })}>
            <Flexbox className='top-bar__inner'>
                <Flexbox className='top-bar__heading'>
                    {props.avatar && (
                        <Avatar size='large' avatar={props.avatar} />
                    )}
                    <div>
                        <Flexbox>
                            <Typography variant='h5'>{props.title}</Typography>
                            {props.titleAdornment}
                        </Flexbox>
                        <Typography variant='subtitle1'>{props.subtitle}</Typography>
                    </div>
                </Flexbox>
                {props.children && (
                    <Flexbox className='top-bar__tools'>{props.children}</Flexbox>
                )}
            </Flexbox>
            {props.tabs && (
                <Tabs
                    className='top-bar__tabs'
                    onChange={(event: React.ChangeEvent<{}>, value: number) => props.tabs.onChange(value)}
                    value={props.tabs.value}
                    indicatorColor='primary'
                >
                    {props.tabs.tabs.map((label: string) => (
                        <Tab label={label} />
                    ))}
                </Tabs>
            )}
        </div>
    )
}

export default TopBar
