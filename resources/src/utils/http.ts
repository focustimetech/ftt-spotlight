import axios from 'axios'

/**
 * Verify whether a user's password is correct by checking with the server.
 * @param password The password.
 * @return `Promise<Void>` resulting from `axios` request.
 */
export const verifyPassword = (password: string): Promise<void> => {
    return axios.post('/api/verify-user', { password })
}
