import { IStaff, IStudent, ITeacher } from './auth'

export interface IClusterDetails {
    id: number
    name: string
    owner: IStaff | ITeacher
}

export interface ICluster extends IClusterDetails {
    studentIds: number[]
}
