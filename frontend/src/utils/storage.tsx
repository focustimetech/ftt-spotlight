import axios from 'axios'

export type UserType = 'staff' | 'student'

/**
 * Recursively uploads staff or student CSV files to the server.
 * @param files Files to upload.
 * @param headers The ordered CSV headers.
 * @param userType Either 'student' or 'staff'.
 * @throws Errors if unable to post files.
 */
export const uploadCSV = (
        files: File[],
        headers: string[],
        userType: 'staff' | 'student',
        password: string
    ): Promise<void> => {
    if (files.length === 0)
        return

    const url = userType === 'student'
        ? 'http://localhost:8000/api/students/upload'
        : 'http://localhost:8000/api/staff/upload'

    const file = files.pop()
    const formData = new FormData
    formData.append('file', file)
    formData.append('headers', headers.join(','))
    formData.append('password', password)
    return axios.post(url, formData)
        .then(() => {
            uploadCSV(files, headers, userType, password)
        })
        .catch((reason: any) => {
            throw new Error('Unable to upload files. ' + reason)
        })
}
