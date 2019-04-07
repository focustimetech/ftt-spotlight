export interface IStudent {
	id: number
	name: string
	clusters: ICluster[]
	starred: boolean
}

export interface ICluster {
	id: number
	name: string
}