import { IStudent, IStaff, ITeacher } from '../auth'
import { IClassroom } from '../classroom'
import { IClusterDetails } from '../cluster'

export type SearchResultKey =
    | 'teacher'
    | 'staff'
    | 'student'
    | 'cluster'
    | 'classroom'

export interface ISearchResults {
    student?: IStudent[]
    staff?: IStaff[]
    teacher?: ITeacher[]
    cluster?: IClusterDetails[]
    classroom?: IClassroom[]
}

