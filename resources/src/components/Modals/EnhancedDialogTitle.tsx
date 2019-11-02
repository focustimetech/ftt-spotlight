import classNames from 'classnames'
import * as React from 'react'

import {
	Icon,
	IconButton,
	Tab,
	Tabs,
	Tooltip,
	Typography
} from '@material-ui/core'

import { INavTabs } from '../TopNav'

interface IProps {
	children?: any | any[]
	tabs?: INavTabs
	className?: string
	id?: string
	title?: string
	onClose?: () => void
}

/**
 * An enhanced DialogTitle for material-ui Dialogs.
 * @param children The contents of the DialogTitle (optional)
 * @param className className that gets passed to the container div (optional)
 * @param id id property that gets passed to the container div (optional)
 * @param title The title for the form (optional)
 * @param onClose Optional callback, including which renders a close icon button
 */
export const EnhancedDialogTitle = (props: IProps) => {
	return (
		<div className={classNames(
			'dialog-title', {'--close-button': props.onClose}, {[props.className]: Boolean(props.className)}
		)} id={props.id}>
			<div className='dialog-title__content'>
				<div className='dialog-title__inner'>
					{props.title && (
						<Typography variant='h6'>{props.title}</Typography>
					)}
					{props.children}
				</div>
				{props.onClose && (
					<Tooltip title='Close'>
						<IconButton className='icon-close' onClick={() => props.onClose()}>
							<Icon>close</Icon>
						</IconButton>
					</Tooltip>
				)}
			</div>
			{props.tabs && (
				<Tabs
					className='top-nav__tabs'
					value={props.tabs.value}
					onChange={props.tabs.onChange}
					variant='fullWidth'
					indicatorColor='primary'
				>
					{props.tabs.tabs.map((label: string, index: number) => (
						<Tab label={label} key={index}/>
					))}
				</Tabs>
			)}
		</div>
	)
}
