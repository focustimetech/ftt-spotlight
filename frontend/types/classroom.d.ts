import { ITeacher } from "./auth";

export interface IClassroom {
    id: number
    capacity: number
    name: string
    teacherId: number
}

export type INewClassroom = Omit<IClassroom, 'id' | 'teacherId'>
