import * as React from 'react'
import { Snackbar } from '@material-ui/core';

interface ISnackbarButton {
    text: string,
    closeOnCallback: boolean
    callback: () => any
}

interface ISnackbar {
    message: string
    buttons: ISnackbarButton[]
}

export class SnackbarQueue {
    private items: ISnackbar[]

    constructor() {
        this.items = []
    }

    public enqueue(snackbar: ISnackbar) {
        this.items.unshift(snackbar)
    }

    public dequeue(): ISnackbar {
        if (this.isEmpty()) {
            return null
        }
        return this.items.pop()
    }

    public peek(): ISnackbar {
        if (this.isEmpty()) {
            return null
        }
        return this.items[this.items.length - 1]
    }

    public size(): number {
        return this.items.length
    }

    public isEmpty(): boolean {
        return this.items.length === 0
    }
}

interface IProps {
    closeButton?: boolean
    Snackbar: SnackbarQueue
}

export const SnackbarProvider = (props: IProps) => {

}
