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