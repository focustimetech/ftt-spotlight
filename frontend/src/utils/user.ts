import { AccountType, IUser } from '../types/auth'

export const getDisplayRole = (accountType: AccountType): string => {
    switch (accountType) {
        case 'student':
            return 'Student'
        case 'staff':
            return 'Staff Member'
        case 'teacher':
            return 'Teacher'
        case 'guardian':
            return 'Parent'
        case 'sysadmin':
            return 'CS'
        default:
            return 'User'
    }
}

export const getProfileLink = (user: IUser): string => {
    const { accountType, accountId } = user
    switch (accountType) {
        case 'student':
            return `/students/${accountId}`
        case 'staff':
            return `/staff/${accountId}`
        case 'teacher':
            return `/teachers/${accountId}`
        case 'guardian':
            return `/parents/${accountId}`
        case 'sysadmin':
            return `/sysadmin/${accountId}`
        default:
            return '/'
    }
}
