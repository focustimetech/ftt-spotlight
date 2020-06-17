export interface IAppointment {
    id: number
    memo: string
    date: string
    teacherId: number
    studentId: number
    blockId: number
    classroomId: number
}

export interface INewAppointment {
    memo: string
    date: string
    blockId: number
    classroomId: number
    studentIds: number[]
}
