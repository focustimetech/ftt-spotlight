export interface ILayoutContainerProps {
    children: any
    getLayout?: (node: React.ReactNode) => React.ReactNode
}

export type Orientation = 'vertical' | 'horizontal'
