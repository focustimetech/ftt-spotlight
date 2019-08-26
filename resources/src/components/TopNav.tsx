import * as React from 'react'
import * as classNames from 'classnames'

import {
	Tab,
	Tabs
} from '@material-ui/core'

export interface Tabs {
	value: number
	onChange: (event: any, value: any) => void,
	tabs: string[]
}

interface IProps {
	children?: any
	className?: string
	tabs?: Tabs
}

/**
 * TopNav for the main app view. `props.children` Takes *only* one or two `<ul>` elements.
 */
export const TopNav = (props: IProps) => {
	return (
		<>
			<div className={classNames('top-nav', props.className)}>
				{ /* <IconButton className='top-nav_menu' onClick={props.onMenuClick}><Icon>menu</Icon></IconButton> */}
				<div className='top-nav__inner'>{props.children}</div>
				{props.tabs && (
					<Tabs
						className='top-nav__tabs'
						value={props.tabs.value}
						onChange={props.tabs.onChange}
						variant='fullWidth'
						indicatorColor='primary'
					>{props.tabs.tabs.map((label: string) => {
						return <Tab label={label} />
					})}</Tabs>
				)}
			</div>
		</>
	)
}