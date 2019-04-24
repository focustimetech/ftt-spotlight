import { Page } from "csstype";

export interface ITableHeaderColumn {
	id: string
	disablePadding?: boolean
	isNumeric: boolean
	label: string
	sortLabel?: string
	link?: string // If set, column renders external links
	th?: boolean // If set, column is table header
	searchable?: boolean
}

export type ITableFilter = ITableStringFilter | ITableNumericFilter

export interface ITableStringFilter {
	id: string
	type: ITableStringFilterType
	value: string
}

export interface ITableNumericFilter {
	id: string
	type: ITableNumericFilterType
	value: number
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