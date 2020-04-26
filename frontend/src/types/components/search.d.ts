import { IStudent, IStaff, ITeacher } from '../auth'
import { IClusterDetails } from '../cluster';

interface IClassroom {}

export interface ISearchResults {
    students?: IStudent[]
    staff?: IStaff[]
    teachers?: ITeacher[]
    clusters?: IClusterDetails[]
    classrooms?: IClassroom[]
}

