import { createMuiTheme, Theme } from '@material-ui/core'

const primary = {
    main: '#034670',
    light: '#E3E9EE'
}

const secondary = {
    main: '#43E0FF'
}

export const theme: Theme = createMuiTheme({
    palette: {
        primary,
        secondary
    }
})

export interface IColor {
    name: TopicColor,
    label: string
}

export const COLORS: IColor[] = [
    { name: 'red', label: 'Red' },
    { name: 'pink', label: 'Pink' },
    { name: 'purple', label: 'Purple' },
    { name: 'deep-purple', label: 'Deep Purple' },
    { name: 'indigo', label: 'Indigo' },
    { name: 'blue', label: 'Blue' },
    { name: 'light-blue', label: 'Light Blue' },
    { name: 'cyan', label: 'Cyan' },
    { name: 'teal', label: 'Teal' },
    { name: 'green', label: 'Green' },
    { name: 'light-green', label: 'Light Green' },
    { name: 'lime', label: 'Lime' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'amber', label: 'Amber' },
    { name: 'orange', label: 'Orange' },
    { name: 'deep-orange', label: 'Deep Orange' },
    { name: 'brown', label: 'Brown' },
    { name: 'blue-grey', label: 'Blue Grey' }
]

export type TopicColor =
    | 'red'
    | 'pink'
    | 'purple'
    | 'deep-purple'
    | 'indigo'
    | 'blue'
    | 'light-blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'light-green'
    | 'lime'
    | 'yellow'
    | 'amber'
    | 'orange'
    | 'deep-orange'
    | 'brown'
    | 'blue-grey'

/**
 * Returns a random Color.
 * @return The a random Color.
 */
export const getRandomColor = (): IColor => {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
}
