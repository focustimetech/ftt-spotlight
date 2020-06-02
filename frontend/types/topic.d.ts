export interface ITopic {
    id: number
    memo: string
    color: string
    teacherId: number
    classroomId: number
}

export interface ITopicSchedule {
    topic: ITopic
    blockId: number
    date: string
}

export type INewTopic = Omit<ITopic, 'id' | 'teacherId'>
