import * as React from 'react'
import * as classNames from 'classnames'

import {
	Icon,
	IconButton
} from '@material-ui/core'

interface IProps {
	children?: any
	id?: string
	title?: string
	onClose?: () => void
}
export const EnhancedDialogTitle = (props: IProps) => {
	return (
		<div className={classNames('dialog-title', {'--close-button': props.onClose})} id={props.id}>
			<div>
				{props.title && (
					<h3>{props.title}</h3>
				)}
				{props.children}
			</div>
			{props.onClose && (
				<IconButton className='icon-close' onClick={() => props.onClose()}>
					<Icon>close</Icon>
				</IconButton>
			)}
		</div>
	)
}