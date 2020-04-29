import { IStaff, ITeacher } from './auth'
import { IClassroom } from './classroom'

export interface ITopic {
    id: number
    memo: string
    color: string
    owner: IStaff | ITeacher
    classroom: IClassroom
}
