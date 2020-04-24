import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import {
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

import { Orientation } from '../../types/layout'

export interface INavItemProps {
    title: string
    orientation: Orientation
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: any
    className?: string
    href?: string
    icon?: string
    src?: string
}

const NavItem = (props: INavItemProps) => {
    return (
        <div className={classNames('nav-item', props.className)}>
            <Tooltip title={props.title} placement={props.orientation === 'vertical' ? 'right' : 'top'}>
                {props.href ? (
                    <div>
                        <Link href={props.href}>
                            <IconButton onClick={props.onClick}>
                                {props.icon && (
                                    <Icon>{props.icon}</Icon>
                                )}
                                {props.src && (
                                    <img className='nav-item__image' src={props.src} />
                                )}
                                {props.children}
                            </IconButton>
                        </Link>
                    </div>
                ) : (
                    <IconButton onClick={props.onClick}>
                        {props.icon && (
                            <Icon>{props.icon}</Icon>
                        )}
                        {props.src && (
                            <img className='nav-item__image' src={props.src} />
                        )}
                        {props.children}
                    </IconButton>
                )}
            </Tooltip>
        </div>
    )
}

export default NavItem
