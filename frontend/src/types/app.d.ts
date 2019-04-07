export interface ITab {
	value: string
	label: string
}

export interface ITabs {
	value: string
	onChange: (event: any, value: any) => void,
	tabs: ITab[]
}