import { IStaff, IStudent, ITeacher } from './auth'

export interface ICluster {
    id: number
    studentIds: number[]
    public: boolean
    name: string
    userId: number
}

export type INewCluster = Omit<ICluster, 'id' | 'userId' | 'studentIds'>

export interface IClusterPivot {
    clusterId: number
    studentIds: number[]
}
