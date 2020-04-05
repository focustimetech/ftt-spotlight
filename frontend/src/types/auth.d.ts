import { IStaff } from "./staff";
import { IStudent } from './student'
import { TopicColor } from '../theme'

export interface ICredentials {
    username: string
    password: string
}

export interface IAvatar {
    initials: string
    color: TopicColor
}

export interface IUserDetails {
    firstName: string
    lastName: string
    name: string
    avatar: IAvatar
}