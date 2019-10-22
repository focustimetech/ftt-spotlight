import * as React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import {
	Breadcrumbs,
	Tab,
	Tabs,
	FormControlLabel,
	Typography
} from '@material-ui/core'

export interface INavTabs {
	value: number
	onChange: (event: any, value: any) => void,
	tabs: string[]
}

export interface INavLink {
	value: string
	to?: string
}

interface IProps {
	breadcrumbs?: INavLink[]
	actions?: React.ReactNode
	children?: any
	className?: string
	tabs?: INavTabs
}

export const TopNav = (props: IProps) => {
	return (
		<>
			<div className={classNames('top-nav', props.className)}>
				<div className='top-nav__inner'>
					{(props.breadcrumbs && props.breadcrumbs.length) && (
						<Breadcrumbs>
							{props.breadcrumbs.slice(0, props.breadcrumbs.length - 1)
								.map((link: INavLink) => (
									<Link to={link.to} key={link.to}>
										<Typography variant='h6' color='inherit'>{link.value}</Typography>
									</Link>
								))
							}
							<Typography variant='h6' color='textPrimary'>{props.breadcrumbs[props.breadcrumbs.length - 1].value}</Typography>
						</Breadcrumbs>
					)}
					{props.children}
					{props.actions && (
						<div className='top-nav_actions'>{props.actions}</div>
					)}
				</div>
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