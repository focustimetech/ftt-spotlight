import * as React from 'react'
import * as classNames from 'classnames'

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	TextField
} from '@material-ui/core'

interface IProps {
	tableQuery: string
}

export class SearchableTable extends React.Component<IProps> {

	handleTableQueryChange = (event: any) => {
		this.setState({ tableQuery: event.target.value })
	}

	render() {
		return (
			<>
				<TextField
					placeholder='Search Staff'
					value={this.props.tableQuery}
					onChange={this.handleTableQueryChange}
					variant='standard'
				/>
				<Table>
					<TableBody>
						<TableRow>
							
						</TableRow>
					</TableBody>
				</Table>
			</>
		)
	}
}