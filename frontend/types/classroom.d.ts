import { ITeacher } from "./auth";

export interface IClassroom {
    id: number
    capacity: number
    name: string
    owner: ITeacher
}
