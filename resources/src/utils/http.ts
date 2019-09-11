import axios from 'axios'

/**
 * Verify whether a user's password is correct by checking with the server.
 * @param password The password.
 * @return `Promise<Void>` resulting from `axios` request.
 */
export const verifyPassword = (password: string): Promise<void> => {
    return axios.post('/api/verify-user', { password })
}

/**
 * Changes the authenticated user's password
 * @param oldPassword The user's old password, which is verified by the server
 * @param newPassword The user's new password
 */
export const changePassword = (oldPassword: string, newPassword: string): Promise<any> => {
    return axios.post('/api/change-password', {
        old_password: oldPassword,
        new_Password: newPassword
    })
}
