import axios from 'axios'

/**
 * Recursively uploads staff or student CSV files to the server.
 * @param files Files to upload.
 * @param headers The ordered CSV headers.
 * @param userType Either 'student' or 'staff'.
 * @throws Errors if unable to post files.
 */
export const uploadCSV = (files: File[], headers: string[], userType: 'staff' | 'student'): void => {
    if (files.length === 0)
        return

    const url = userType === 'student'
        ? 'http://localhost:8000/api/students/upload'
        : 'http://localhost:8000/api/staff/upload'

    const file = files.pop()
    const formData = new FormData
    formData.append('file', file)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    axios.post(url, { ...formData, headers }, config)
        .then((res: any) => {
            uploadCSV(files, headers, userType)
        })
        .catch((reason: any) => {
            throw new Error('Unable to upload files. ' + reason)
        })
}
