import { Page } from "csstype";

/**
 * @param id Key for the column.
 * @param disablePadding Will remove padding in cells. False by default.
 * @param isNumeric Indicates whether data in this column is numeric or not.
 * @param label The name for the columm.
 * @param sortLabel The label given when sorting by the column. `label` by default.
 * @param link If set, column is rendered as external link having the given base URL.`null` by default.
 * @param th If true, column is styled as a table header. False by default.
 * @param searchable If true, data in this column can be searched, independant of whether or not it is rendered. True by default.
 * @param visible If true, this columm will be rendered in the table, independant of whether or not it is searchable.
 * @param filterable If true, the table can be filtered by this column.
 */
export interface ITableHeaderColumn {
	id: string
	disablePadding?: boolean
	isNumeric: boolean
	label: string
	sortLabel?: string
	th?: boolean // If set, column is table header
	searchable?: boolean
	visible: boolean
	filterable: boolean
}

export type ITableFilter = ITableStringFilter | ITableNumericFilter

export interface ITableStringFilter {
	id: string
	type: 'string'
	rule: ITableStringFilterType
	value: string
	[key: string]: any
}

export interface ITableNumericFilter {
	id: string
	type: 'numeric'
	rule: ITableNumericFilterType
	value: string
	[key: string]: any
}

export type ITableStringFilterType = 
	| 'equal-to'
	| 'not-equal-to'
	| 'starts-with'
	| 'ends-with'
	| 'contains'

export type ITableNumericFilterType = 
	| 'less-than'
	| 'greater-than'
	| 'equal-to'
	| 'not-equal-to'

export interface ITableAction {
	id: string
	name: string
	action: (ids: number[]) => void
} 

export interface ITableLink {
	label: string
	key: string
	path: string
}
