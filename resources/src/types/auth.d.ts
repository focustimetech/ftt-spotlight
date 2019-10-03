import { IStaff } from "./staff";
import { IStudent } from './student'

export type AuthState = 
    | 'sign-in'
    | 'signed-in'
    | 'signed-out'
    | 'unauthenticated'
    | 'failed-settings'

export interface ICredentials {
    username: string
    password: string
}

export interface ILoginError {
    type: 'username' | 'password'
    message: string
}

interface IUserProperties {
    id: number
    username: string
    display_name: string
    display_role: string
    password_expired: boolean
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
