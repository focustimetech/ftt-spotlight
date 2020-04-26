import { IStudent } from './auth'

export interface IClusterDetails {
    name: string
}

export interface ICluster extends IClusterDetails {
    students: IStudent[]
}
