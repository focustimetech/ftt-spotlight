import { createMuiTheme, Theme } from '@material-ui/core'

const primary = {
    main: '#2962FF'
}

export const theme: Theme = createMuiTheme({
    palette: {
        primary: primary
    }
})

export interface IColor {
    name: string,
    label: string,
    hex: string
}

const colors: IColor[] = [
    { name: 'blue', label: 'Blue', hex: '0000FF' },
    { name: 'green', label: 'Green', hex: '00FF00' },
    { name: 'red', label: 'Red', hex: 'FF0000' }
]

export type TopicColor = 
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
