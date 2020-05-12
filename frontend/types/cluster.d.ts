import { IStaff, IStudent, ITeacher } from './auth'

export interface IClusterDetails {
    id: number
    name: string
    userId: number
}

export interface ICluster extends IClusterDetails {
    studentIds: number[]
}

export type INewCluster = Omit<IClusterDetails, 'id' | 'userId'>
