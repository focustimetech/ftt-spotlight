import { IStaff } from "./staff";
import { IStudent } from './student'

export interface ICredentials {
    username: string
    password: string
}

interface IUserProperties {
    id: number
    username: string
    display_name: string
    display_role: string
}

export interface IStaffUser {
    details: IStaff
    account_type: 'staff'
}

export interface IStudentUser {
    details: IStudent
    account_type: 'student'
}

export type IUser = (IStaffUser | IStudentUser) & IUserProperties
