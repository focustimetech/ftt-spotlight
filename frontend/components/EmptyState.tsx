import React from 'react'
import { Typography } from '@material-ui/core'

interface IEmptyStateProps {
	image: string
	header: string
	subheader: string
}

/**
 * Empty state icon template for widgets and tables.
 * @param variant The filename of the desired icon.
 * @param children Text for the EmptyStateIcon.
 */
const EmptyState = (props: IEmptyStateProps) => {
	return (
		<div className='empty-state'>
			<img src={`/images/empty-state/${props.image}.svg`} className='empty-state__image' />
			<Typography variant='h6'>{props.header}</Typography>
			<Typography variant='subtitle1'>{props.subheader}</Typography>
		</div>
	)
}

export default EmptyState
