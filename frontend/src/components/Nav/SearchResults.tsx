import React from 'react'

import { ISearchResults } from '../../types/components/search'

interface ISearchResultProps {
    results: ISearchResults
}

const SearchResults = (props: ISearchResultProps) => {
    return <div className='search-results'></div>
}

export default SearchResults
