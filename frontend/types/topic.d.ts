export interface ITopic {
    id: number
    memo: string
    color: string
    teacherId: number
    classroomId: number
}

export type INewTopic = Omit<ITopic, 'id' | 'teacherId'>
