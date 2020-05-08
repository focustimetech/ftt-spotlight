const pluralize = (word: string, amount: number, singular: string = '', plural: string = 's') => {
    return `${word}${amount === 1 ? singular : plural}`
}

export default pluralize
