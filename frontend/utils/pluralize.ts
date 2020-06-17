/**
 * Pluralizes a noun.
 * @param {string} [word] The noun being pluralized.
 * @param {number} [amount] The amount.
 * @param {string} [suffixSingular = ] The suffix given if the word is singular
 * @param {string} [suffixPlural = s] The suffix given if the word is plural
 */
const pluralize = (word: string, amount: number, suffixSingular: string = '', suffixPlural: string = 's') => {
    return `${word}${amount === 1 ? suffixSingular : suffixPlural}`
}

export default pluralize
