import { IStudent, IStaff, ITeacher } from '../auth'
import { IClassroom } from '../classroom'
import { IClusterDetails } from '../cluster'
import { ITopic } from '../topic'

export type SearchResultKey =
    | 'teacher'
    | 'staff'
    | 'student'
    | 'cluster'
    | 'classroom'
    | 'topic'

export interface ISearchResults {
    student?: IStudent[]
    staff?: IStaff[]
    teacher?: ITeacher[]
    cluster?: IClusterDetails[]
    classroom?: IClassroom[]
    topic?: ITopic[]
    [key: string]: any[]
}

