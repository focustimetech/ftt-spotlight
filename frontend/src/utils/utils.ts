import { ICheckInMethod, ICheckInMethodDetails } from '../types/calendar'

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
export const isEmpty = (obj: any): boolean => {
    if (!obj) {
        return true
    } else {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }
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
    if (!object) {
        return []
    } else {
        return isArray(object) ? object : [object]
    }
}

/**
 *
 */
export const getMethodDetailsFromName = (method: ICheckInMethod): ICheckInMethodDetails => {
    switch (method) {
        case 'manual':
            return {
                icon: 'keyboard',
                title: 'Via manual check-in',
            }
        case 'air':
            return {
                icon: 'wifi',
                title: 'Via Air Check-in',
            }
        case 'roll-call':
            return {
                icon: 'assignment',
                title: 'Via roll call',
            }
        case 'amendment':
            return {
                icon: 'assignment_turned_in',
                title: 'Amended',
            }
        case 'proactive':
            return {
                icon: 'access_time',
                title: 'Proactive check-in'
            }
        case 'retroactive':
            return {
                icon: 'access_time',
                title: 'Retroactive check-in'
            }
    }
}

/**
 * Determines the user's local time and returns it as a string.
 * @return The local timestamp
 */
export const getCurrentTimestamp = (): string => {
    const now: Date = new Date()
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
}

/**
 * Downloads a CSV file given a 2D array of rows.
 * @param rows The CSV rows to download.
 * @param filename The CSV's filename, without the CSV extension (optional).
 */
export const downloadCsv = (rows: Array<Array<string | number>>, filename?: string) => {
    const csvContent: string = 'data:text/csv;charset=utf-8,'
        + rows.map((row: Array<string | number>): string => row.join(',')).join('\n')
    const encodedUri: string = encodeURI(csvContent)

    if (filename) {
        const link: HTMLAnchorElement = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `${filename}.csv`)
        document.body.appendChild(link)

        // Download the CSV file with the given filename
        link.click()
    } else {
        window.open(encodedUri)
    }
}

export const getFileSizeStringFromBytes = (fileSize: number, si: boolean = true, length: number = 3): string => {
    if (fileSize <= 0) {
        return '0 B'
    }
    const base: number = si ? 1024 : 1000 // Swapped?
    const i: number = Math.floor(Math.log(fileSize) / Math.log(base))
    const units: string = si
        ? ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
        : ['B', 'kiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][i]
    const value: number = fileSize / Math.pow(base, i)
    return `${value.toFixed(length - String(Math.floor(value)).length)} ${units}`
}

/**
 * Returns a Material-UI icon name representing a file when given a file extension.
 * @param extension The file extension
 * @return The icon name
 */
export const getIconFromFileExtension = (extension: string): string => {
    switch (extension.toLowerCase()) {
        // Image
        case 'jpg':
        case 'jpeg':
        case 'jfif':
        case 'exif':
        case 'tiff':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'psd':
        case 'img':
        case 'pdn':
        case 'dng':
        case 'ico':
            return 'image'

        // Video
        case 'mp4':
        case 'mov':
        case 'avi':
        case 'mkv':
        case 'webm':
        case 'flv':
        case 'vob':
        case 'gifv':
        case 'wmv':
        case 'yuv':
        case 'asf':
        case 'm4p':
        case 'mpg':
        case 'mpeg':
        case 'mp2':
        case 'mpv':
        case 'm4v':
        case 'f4v':
        case '3gp':
            return 'videocam'

        // Spreadsheet, Tabulated
        case '123':
        case 'aws':
        case 'csv':
        case 'gsheet':
        case 'numbers':
        case 'ods':
        case 'ots':
        case 'stc':
        case 'sxc':
        case 'bcsv':
        case 'wks':
        case 'xls':
        case 'xlsb':
        case 'xlsm':
        case 'xlsx':
        case 'xlr':
        case 'xlt':
        case 'xltm':
        case 'xlw':
        case 'osheet':
            return 'insert_chart'

        // Document, Text
        case 'markdown':
        case 'md':
        case 'doc':
        case 'docx':
        case 'dot':
        case 'dotx':
        case 'gdoc':
        case 'mcw':
        case 'txt':
        case 'text':
        case 'tex':
        case 'info':
        case 'pages':
        case 'dita':
        case 'me':
            return 'text_snippet'

        // Presentation
        case 'ppt':
        case 'pptx':
        case 'gslides':
        case 'odp':
        case 'otp':
        case 'pps':
        case 'sti':
        case 'sxi':
        case 'key':
        case 'keynote':
            return 'slideshow'

        // Archive
        case 'zip':
        case '7z':
        case 'deb':
        case 'jar':
        case 'gzip':
        case 'tar':
        case 'tgz':
        case 'gz':
        case 'rar':
        case 'z':
            return 'snippet_folder'

        // Audio
        case 'mp3':
        case 'wav':
        case 'flac':
        case 'aiff':
        case 'aifc':
        case 'aif':
        case 'bwf':
        case 'la':
        case 'wma':
        case 'dts':
        case 'ac3':
        case 'amr':
        case 'mp1':
        case 'aac':
        case 'ots':
        case 'mpc':
        case 'ogg':
            return 'audiotrack'

        // Playlist
        case 'm3u':
        case 'm3u8':
        case 'pls':
            return 'queue_music'

        // Contact
        case 'vcf':
            return 'perm_contact_calendar'

        // Calendar
        case 'sc2':
        case 'ical':
        case 'cal':
            return 'today'

        // Email
        case 'pst':
        case 'ost':
        case 'eml':
            return 'email'

        // Phone
        case 'xap':
            return 'phone'

        // PDF
        case 'pdf':
            return 'picture_as_pdf'

        // Web
        case 'htm':
        case 'html':
        case 'xhtml':
        case 'xml':
        case 'mhtml':
        case 'dtd':
        case 'css':
            return 'web'

        // Database
        case 'sql':
            return 'storage'

        // Font
        case 'ttf':
        case 'woff':
        case 'woff2':
            return 'font_download'

        // Code
        case 'c':
        case 'cc':
        case 'cpp':
        case 'cs':
        case 'lua':
        case 'php':
        case 'js':
        case 'jsx':
        case 'tsx':
        case 'class':
        case 'java':
        case 'r':
        case 'py':
        case 'bat':
        case 'kt':
        case 'vbs':
        case 'rs':
        case 'scss':
        case 'sass':
        case 'json':
            return 'code'

        // Other
        default:
            return 'widgets'
    }
}
