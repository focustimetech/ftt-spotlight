import classNames from 'classnames'
import React from 'react'

import { Tab, Tabs, Typography } from '@material-ui/core'

import Avatar, { IAvatarProps } from './Avatar'
import Flexbox from './Layout/Flexbox'

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
    AvatarProps?: IAvatarProps
    tabs?: ITabs
}

const TopBar = (props: ITopBarProps) => {
    return (
        <div className={classNames('top-bar', { '--breadcrumbs': props.breadcrumbs }, { '--tabs': props.tabs }, { '--children': props.children })}>
            <Flexbox className='top-bar__inner'>
                <Flexbox className='top-bar__heading'>
                    {props.AvatarProps && (
                        <Avatar {...props.AvatarProps} size={props.AvatarProps.size || 'large'} />
                    )}
                    <div>
                        <Flexbox>
                            <Typography variant='h5'>{props.title}</Typography>
                            {props.titleAdornment}
                        </Flexbox>
                        <Typography variant='subtitle1'>{props.subtitle}</Typography>
                    </div>
                </Flexbox>
            </Flexbox>
            {props.children}
            {props.tabs && (
                <Tabs
                    className='top-bar__tabs'
                    onChange={(event: React.ChangeEvent<{}>, value: number) => props.tabs.onChange(value)}
                    value={props.tabs.value}
                    indicatorColor='primary'
                >
                    {props.tabs.tabs.map((label: string) => (
                        <Tab label={label} key={label} />
                    ))}
                </Tabs>
            )}
            <Tabs indicatorColor='primary' value={0} variant='fullWidth'>
                <Tab label={
                    <Flexbox>
                        <Typography variant='h3'>56</Typography>
                        <Typography variant='button'>Tickets</Typography>
                    </Flexbox>
                } key={0} />
                <Tab label={
                    <Flexbox>
                        <Typography variant='h3'>12</Typography>
                        <Typography variant='button'>Open Tickets</Typography>
                    </Flexbox>
                } key={1} />
                <Tab label={
                    <Flexbox>
                        <Typography variant='h3'>13</Typography>
                        <Typography variant='button'>Tickets Resolved</Typography>
                    </Flexbox>
                } key={2} />
                <Tab label={
                    <Flexbox>
                        <Typography variant='h3'>5</Typography>
                        <Typography variant='button'>Awaiting Response</Typography>
                    </Flexbox>
                } key={3} />
            </Tabs>
        </div>
    )
}

export default TopBar
