import { AccountType } from '../types/auth'

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
