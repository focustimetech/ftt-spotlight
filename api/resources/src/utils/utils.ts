import axios from 'axios'

/**
 * 
 * @param list A list of string items to truncate
 * @param objectName The kind of objects in the list
 * Example input: (['Red', 'Green', 'Blue'], 'Group')
 * Example output: 'Red, Green and 1 other Group'
 */
export const listToTruncatedString = (list: string[], objectName?: string): string => {
    if (list.length === 0) {
        return objectName ? `No ${objectName}s` : 'None'
    } else {
        if (list.length === 1) {
            return list[0]
        } else if (list.length === 2) {
            return `${list[0]} and ${list[1]}`
        } else if (list.length === 3) {
            return `${list[0]} and 2 other${objectName ? ` ${objectName}s` : 's'}`
        } else {
            return `${list[0]}, ${list[1]} and ${list.length - 2} other${objectName ? ` ${objectName}s` : 's'}`
        }
    }
}

/**
 * Determines whether or not an Object is empty.
 * @param obj The object.
 * @return `true` if the object is empty, `false` otherwise.
 */
export const isEmpty = (obj: Object): boolean => {
    if (!obj) {
        return true
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * Determines whether an object is an array.
 * @param object The object.
 * @return `true` if the object is an array.
 */
export const isArray = (object: any): boolean => {
    return Array.isArray(object)
}

/**
 * Creates an array from an object. If the given object is already an array,
 * the original array is returned.
 * @param object The object or array
 * @return An array containing either the object, or all original array entries
 */
export const makeArray = (object: any): any[] => {
    return isArray(object) ? object : [object]
}

/**
 * Verify whether a user's password is correct by checking with the server.
 * @param password The password.
 * @return `Promise<Void>` resulting from `axios` request.
 */
export const verifyPassword = (password: string): Promise<void> => {
    return axios.post('http://localhost:8000/api/verify-user', { password })
}
