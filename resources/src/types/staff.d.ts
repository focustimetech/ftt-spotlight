export interface IStaff {
    id?: number
    name?: string
    account_type: IStaffAccountType
    email: string
    administrator: boolean
    last_name: string
    first_name: string
    title: IStaffTitle
}

export type IStaffTitle =
    | 'Dr.'
    | 'Miss'
    | 'Ms.'
    | 'Mlle.'
    | 'Mme.'
    | 'Mr.'
    | 'Mrs.'
    | 'Prof.'

export type IStaffAccountType = 'teacher' | 'admin'

export interface INotification {
    id: number,
    date: string,
    time: string,
    approximateTime: string,
    body: string,
    read: boolean
}