import * as React from 'react'

interface IProps {
	variant: string
	children: any
}

/**
 * Empty state icon template for widgets and tables.
 * @param variant The filename of the desired icon.
 * @param children Text for the EmptyStateIcon.
 */
export const EmptyStateIcon = (props: IProps) => {
	const imageName = `url('static/images/empty-state/${props.variant}.svg')`
	return (
		<div className='empty-state-icon'>
			<div className='empty-state-icon__image' style={{backgroundImage: imageName}}></div>
			{props.children}
		</div>
	)
}