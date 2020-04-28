interface ISearchBufferItem<T> {
    key: string
    value: T
}

export class SearchBuffer<T> {
    private bufferSize: number
    private buffer: ISearchBufferItem<T>[]

    constructor (bufferSize: number) {
        this.bufferSize = bufferSize
        this.buffer = []
    }

    private findIndex = (key: string): number => {
        return this.buffer.findIndex((item: ISearchBufferItem<T>) => item.key === key)
    }

    push = (key: string, value: T) => {
        const index: number = this.findIndex(key)
        if (index === -1) {
            this.buffer.push({ key, value })
            if (this.buffer.length > this.bufferSize) {
                this.buffer.unshift()
            }
            return
        }
        this.buffer[index].value = value
    }

    retrieve = (key: string, fallback: T = null): T | null => {
        const index: number = this.findIndex(key)
        return index === -1 ? fallback : this.buffer[index].value
    }

    flush = () => {
        this.buffer = []
    }
}
