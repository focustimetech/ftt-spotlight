import axios from 'axios'

import { makeArray } from './utils'

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
        ? '/api/students/upload'
        : '/api/staff/upload'

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

/**
 * Writes a plain JavaScript object to localStorage, which can only store strings.
 * @param key The localStorage key.
 * @param object The object to write.
 */
export const writeObjectToLocalStorage = (key: string, object: any) => {
    const json: string = JSON.stringify(object)
    localStorage.setItem(key, json)
}

/**
 * Appends an object to another object that is currently in localStorage.
 * If the object in localStorage isn't currently an array, it is made into
 * and array, and the given object is then appended to it.
 * @param key The key of the object.
 * @param object The object to append.
 */
export const appendToLocalStorageArray = (key: string, object: any) => {
    const array: object[] = makeArray(getObjectFromLocalStorage(key))
    array.push(object)
    writeObjectToLocalStorage(key, array)
}

/**
 * Retrieves a plain JavaScript object from localStorage which is stored as a string.
 * @param key The key of the localStorage string to retreive
 */
export const getObjectFromLocalStorage = (key: string): any => {
    const json: string = localStorage.getItem(key)
    return JSON.parse(json)
}

// localStorage keys
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const AUTO_SUBMIT = 'AUTO_SUBMIT'
export const CHECK_IN_CHIPS = 'CHECK_IN_CHIPS'
export const CHECK_IN_ERRORS = 'CHECK_IN_ERRORS'
export const MENU_OPEN = 'MENU_OPEN'
export const REMEMBER_USERS = 'REMEMBER_USERS'
