import { TopicColor } from './topic'

type AccountType = 'student' | 'teacher' | 'staff' | 'guardian' | 'sysadmin'

export interface ICredentials {
    username: string
    password: string
}

export interface IAvatar {
    initials: string
    color: TopicColor
}

export interface IUserDetails {
    id: number
    accountType: AccountType
    firstName: string
    lastName: string
    name: string
    avatar: IAvatar
    active: boolean
}

export interface IStudent extends IUserDetails {
    accountType: 'student'
    grade: number
}

export interface IStaff extends IUserDetails {
    accountType: 'staff'
    email: string
    administrator: boolean
}

export interface ITeacher extends Omit<IStaff, 'accountType'> {
    accountType: 'teacher'
    title: string
}

export interface IGuardian extends IUserDetails {
    accountType: 'guardian'
}

export interface ISysAdmin extends IUserDetails {
    accountType: 'sysadmin'
}

export type IUser = IStudent | IStaff | ITeacher | IGuardian | ISysAdmin
