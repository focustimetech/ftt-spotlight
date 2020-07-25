export interface IClassroom {
    id: number
    capacity: number
    name: string
}

export type INewClassroom = Omit<IClassroom, 'id'>
