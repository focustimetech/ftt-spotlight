import * as React from 'react'

import { Toolbar } from '@material-ui/core'

interface IProps {
	numSelected: number
	title: string
}

export const EnhancedTableToolbar = (props: IProps) => {
	const { numSelected, title } = props
	return (
		<Toolbar>
			<div className='enhanced-table__toolbar'>
				{numSelected > 0 ? (
					<h6>{numSelected} selected</h6>
				) : (
					<h6>{title}</h6>
				)}
			</div>
		</Toolbar>
	)
}