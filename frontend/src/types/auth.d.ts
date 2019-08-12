import { IStaffDetails } from "./staff";
import { IStudentDetails } from './student'

export interface ICredentials {
    username: string
    password: string
}

interface IUserProperties {
    id: number
    username: string
}

export interface IStaffUser extends IUserProperties {
    details: IStaffDetails
    account_type: 'staff'
}

export interface IStudentUser extends IUserProperties {
    details: IStudentDetails
    account_type: 'student'
}

export type IUser = IStaffUser | IStudentUser
