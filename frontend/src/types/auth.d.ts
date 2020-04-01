import { IStaff } from "./staff";
import { IStudent } from './student'
import { TopicColor } from "../theme";

export interface ICredentials {
    username: string
    password: string
}

interface ISysAdmin {
    id?: number
    name?: string
    email: string
    initials: string
    color: TopicColor
}

interface IUserProperties {
    id: number
    username: string
    display_name: string
    display_role: string
    password_expired: boolean
    status: string
}

export interface IStaffUser {
    details: IStaff
    account_type: 'staff'
}

export interface IStudentUser {
    details: IStudent
    account_type: 'student'
}

export interface ISysAdminUser {
    details: ISysAdmin
    account_type: 'sysadmin'
}

export type IUser = (IStaffUser | IStudentUser | ISysAdminUser) & IUserProperties
