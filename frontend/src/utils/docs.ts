import marked, { MarkedOptions, Renderer } from 'marked'
import { IDocsTableOfContentsLink } from 'src/types/docs'

interface IRenderOptions extends Partial<Renderer> {
    highlight?: MarkedOptions['highlight']
}

const render = (markdown: string, options: IRenderOptions) => {
    const { highlight, ...rendererOptions } = options
    const renderer = Object.assign(new Renderer(), rendererOptions)

    const markedOptions: MarkedOptions = {
        gfm: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight,
        renderer
    }

    return marked(markdown, markedOptions)
}

export const prepareMarkdown = (markdown: string): { renderedMarkdown: string, tableOfContents: IDocsTableOfContentsLink[] } => {
    const tableOfContents: IDocsTableOfContentsLink[] = []
    const headingHashes: Record<string, boolean> = {}
    const renderedMarkdown: string = render(markdown, {
        heading: (headingHtml: string, headingLevel: 1 | 2 | 3 | 4 | 5 | 6): string => {
            if (headingLevel >= 4) {
                return `<h${headingLevel}>${headingHtml}</h${headingLevel}`
            }

            // Remove Emojis, HTML
            const headingText: string = headingHtml
                .replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g, '')
                .replace(/<\/?[^>]+(>|$)/g, '')
                .trim()
            const hash: string = textToHash(headingText, headingHashes)
            const displayText: string = headingText.replace(/([^\s]\()/g, '$1&#8203;')

            if (headingLevel === 2) {
                tableOfContents.push({
                    title: displayText,
                    hash
                })
            } else if (headingLevel === 3) {
                try {
                    tableOfContents[tableOfContents.length - 1].children.push({
                        title: displayText,
                        hash
                    })
                } catch (error) {
                    throw new Error(`Missing parent level for: ${headingText}`)
                }
            }

            return `<h${headingLevel}><a class="docs__anchor-link" id="${hash}" href="#${hash}">${headingHtml}</a></h${headingLevel}>`
        }
    })

    return { renderedMarkdown, tableOfContents }
}

const makeUnique = (hash: string, unique: Record<string, boolean>, index: number = 1): string => {
    const uniqueHash: string = index === 1 ? hash : `${hash}-${index}`
    if (!unique[uniqueHash]) {
        unique[uniqueHash] = true
        return uniqueHash
    }

    return makeUnique(hash, unique, ++ index)
}

/**
 * @param {string} text - HTML from
 * @param {Record<string, boolean>} [unique] - Ensures that each output is unique in `unique`
 * @returns {string} that is safe to use in fragment links
 */
const textToHash = (text: string, unique: Record<string, boolean> = {}) => {
    const hash: string = encodeURI(text
        .toLowerCase()
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, '')
        .replace(/[!@#$%^&*()=_+[\]{}`~;:'"|,.<>/?\s]+/g, '-')
        .replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''))

    return makeUnique(hash, unique)
}
