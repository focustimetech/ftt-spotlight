import { IStaff } from "./staff";
import { IStudent } from './student'

export interface ICredentials {
    username: string
    password: string
}

interface IUserProperties {
    id: number
    username: string
}

export interface IStaffUser extends IUserProperties {
    details: IStaff
    account_type: 'staff'
}

export interface IStudentUser extends IUserProperties {
    details: IStudent
    account_type: 'student'
}

export type IUser = IStaffUser | IStudentUser
