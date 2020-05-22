export type ITableColumn = ITableGenericColumn | ITableEnumColumn

export interface ITableGenericColumn {
	label: string
	primary?: boolean
	searchable?: boolean
	filterable?: boolean
	hidden?: boolean
	sortLabel?: string
	type: TableColumnType
}

export interface ITableEnumColumn extends ITableGenericColumn {
	type: 'enum'
	values: string[]
}

type TableColumnType =
	| 'string'
	| 'number'
	| 'date'
	| 'enum'

export type TableColumns<T> = Record<keyof T, ITableColumn> & { [key: string]: ITableColumn }

export type ITableFilter =
	| ITableStringFilter
	| ITableNumericFilter
	| ITableEnumFilter
	| ITableDateFilter

interface ITableGenericFilter {
	rule: ITableStringFilterType | ITableNumericFilterType | ITableDateFilterType
	// [key: string]: any
}

export interface ITableStringFilter extends ITableGenericFilter {
	columnKey: string
	type: 'string'
	rule: ITableStringFilterType
	value: string
	component: (value: string) => React.ReactNode
}

export interface ITableNumericFilter extends ITableGenericFilter {
	columnKey: string
	type: 'number'
	rule: ITableNumericFilterType
	value: number
	component: (value: number) => React.ReactNode
}

export interface ITableEnumFilter {
	columnKey: string
	type: 'enum'
	value: string
	component: (value: string) => React.ReactNode
}

export interface ITableDateFilter extends ITableGenericFilter {
	columnKey: string
	type: 'date'
	rule: ITableDateFilterType
	value: Date
	component: (value: Date) => React.ReactNode
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

export type ITableDateFilterType =
	| 'before'
	| 'equal-to'
	| 'after'

export interface ITableAction {
	id: string
	name: string
	callback: () => void
} 

export type SortOrder = 'asc' | 'desc'
