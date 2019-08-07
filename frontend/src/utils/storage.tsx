import axios from 'axios'

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
        userType: 'staff' | 'student'
    ): Promise<void> => {
    if (files.length === 0)
        return

    const url = userType === 'student'
        ? 'http://localhost:8000/api/students/upload'
        : 'http://localhost:8000/api/staff/upload'

    const file = files.pop()
    console.log(file)
    const formData = new FormData
    formData.append('file', file)
    formData.append('headers', headers.join(','))
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    return axios.post(url, formData)
        .then((res: any) => {
            uploadCSV(files, headers, userType)
        })
        .catch((reason: any) => {
            throw new Error('Unable to upload files. ' + reason)
        })
}
