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
    stringify?: (key: number) => string
    trim?: boolean
}

export const createFilterOptions = <T>(dictionary: Record<number, T>, config: IFilterOptionsConfig<T> = {}) => {
    const {
        ignoreAccents = true,
        ignoreCase = true,
        limit,
        matchFrom = 'any',
        stringify,
        trim = false,
    } = config;

    return (keys: number[], inputValue: string, getOptionLabel: (key: number) => string = stringify) => {
        let input = trim ? inputValue.trim() : inputValue;
        if (ignoreCase) {
            input = input.toLowerCase();
        }
        if (ignoreAccents) {
            input = stripDiacritics(input);
        }
  
        console.log('_keys:', keys)
        const filteredOptions = keys.filter((key: number) => {
            let candidate: string = getOptionLabel(key) // option;
            if (ignoreCase) {
                candidate = candidate.toLowerCase();
            }
            if (ignoreAccents) {
                candidate = stripDiacritics(candidate);
            }

            return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
        });

        return limit ? filteredOptions.slice(0, limit) : filteredOptions;
    }
}
