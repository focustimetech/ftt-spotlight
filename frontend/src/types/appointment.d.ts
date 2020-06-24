export interface IAppointment {
    id: number
    memo: string
    date: string
    teacherId: number
    studentId: number
    blockId: number
    classroomId: number
}

export interface INewAppointment extends Omit<IAppointment, 'id' | 'studentId' | 'teacherId'> {
    studentIds: number[]
}
