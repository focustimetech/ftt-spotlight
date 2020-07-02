export interface IDocsTableOfContentsLink {
    title: string
    hash: string
    // level: 2 | 3
    children?: IDocsTableOfContentsLink[]
}

export interface IDocsCatalogArticle {
    type: 'article'
    title: string
    slug: string
}

export interface IDocsCatalogGroup {
    type: 'group'
    title: string
    slug: string
    children: IDocsCatalogItem[]
}

export type IDocsCatalogItem = IDocsCatalogGroup | IDocsCatalogArticle