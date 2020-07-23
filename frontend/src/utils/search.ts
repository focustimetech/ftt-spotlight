const stripDiacritics = (value: string) => {
    return typeof value.normalize !== 'undefined'
        ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        : value
}

interface IFilterOptionsConfig<T> {
    ignoreAccents?: boolean
    ignoreCase?: boolean
    limit?: number
    matchFrom?: 'any' | 'start'
    stringify?: (key: string | number) => string
    trim?: boolean
}

export const createFilterOptions = <T>(dictionary: Record<string | number, T>, config: IFilterOptionsConfig<T> = {}) => {
    const {
        ignoreAccents = true,
        ignoreCase = true,
        limit,
        matchFrom = 'any',
        stringify,
        trim = false,
    } = config

    return (keys: Array<string | number>, inputValue: string, getOptionLabel: (key: string | number) => string = stringify) => {
        let input = trim ? inputValue.trim() : inputValue
        if (ignoreCase) {
            input = input.toLowerCase()
        }
        if (ignoreAccents) {
            input = stripDiacritics(input)
        }

        const filteredOptions = keys.filter((key: string | number) => {
            let candidate: string = getOptionLabel(key) // option;
            if (ignoreCase) {
                candidate = candidate.toLowerCase()
            }
            if (ignoreAccents) {
                candidate = stripDiacritics(candidate)
            }

            return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1
        })

        return limit ? filteredOptions.slice(0, limit) : filteredOptions
    }
}
