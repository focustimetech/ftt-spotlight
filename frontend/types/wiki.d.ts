export interface IBlogPost {
    id: number
    title: string
    body: string
    author: IBlogAuthor
    new: boolean
    group_id: number
    date_created: string
    date_modified: string
}

export interface IBlogAuthor {
    id: number
    email: string
    name: string
    initials: string
}

export interface IBlogGroup {
    id: number
    title: string
    subtitle: string
    new: boolean
}

export interface IBlogGroupRequest {
    title: string
    subtitle: string
}

export interface IBlogAuthorRequest {
    email: string
    name: string
    initials: string
}

export interface IBlogPostRequest {
    title: string
    body: string
    group_id: number,
    author_id: number
}