import * as React from 'react'

import {
	Icon,
	IconButton
} from '@material-ui/core'

interface IProps {
	children?: any
	id?: string
	onClose?: () => void
}
export const EnhancedDialogTitle = (props: IProps) => {
	return (
		<div className='dialog-title'>
			<h3>{props.children}</h3>
			{props.onClose && (
				<IconButton className='icon-close' onClick={() => props.onClose()}>
					<Icon>close</Icon>
				</IconButton>
			)}
		</div>
	)
}