import * as React from 'react'
import * as classNames from 'classnames'

import {
	Icon,
	IconButton,
	Tooltip
} from '@material-ui/core'

interface IProps {
	children?: any
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
		<div className={classNames('dialog-title', {'--close-button': props.onClose}, {[props.className]: new Boolean(props.className)})} id={props.id}>
			<div className='dialog-title__inner'>
				{props.title && (
					<h3>{props.title}</h3>
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
	)
}