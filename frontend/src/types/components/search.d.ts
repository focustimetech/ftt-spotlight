import { IAvatar } from '../auth'

interface ISearchResult {
    avatar?: IAvatar
    label: string
    href: string
}

interface ISearchGroup {
    groupName: string
    results: ISearchResult
}