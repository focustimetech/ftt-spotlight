import classNames from 'classnames'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

import {
	Breadcrumbs,
	FormControlLabel,
	Tab,
	Tabs,
	Typography
} from '@material-ui/core'

export interface INavTabs {
	value: number
	onChange: (event: any, value: any) => void,
	tabs: string[]
}

export interface INavMenuItem {
	value: string
	onClick: () => void
}

export interface INavLink {
	value: string
	to?: string
	onClick?: () => void
	menuItems?: INavMenuItem[]
}

interface IProps {
	actions?: React.ReactNode
	breadcrumbs?: INavLink[]
	children?: any
	className?: string
	loading?: boolean
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
							{props.loading ? (
								<div style={{ width: 100, height: 32 }}>
									<ContentLoader width={100} height={32}>
										<rect x={0} y={0} rx={4} ry={4} height={32} width={100} />
									</ContentLoader>
								</div>
							) : (
								<Typography variant='h6' color='textPrimary'>
									{props.breadcrumbs[props.breadcrumbs.length - 1].value}
								</Typography>
							)}
						</Breadcrumbs>
					)}
					{props.children}
					{props.actions && (
						<div className='top-nav__actions'>{props.actions}</div>
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
