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

export const COLORS: Record<string, string> = {
    '#C62828': 'Red',
    '#AD1457': 'Pink',
    '#6A1B9A': 'Purple',
    '#4527A0': 'Deep Purple',
    '#283593': 'Indigo',
    '#1565C0': 'Blue',
    '#0277BD': 'Light Blue',
    '#00838F': 'Cyan',
    '#00695C': 'Teal',
    '#2E7D32': 'Green',
    '#558B2F': 'Light Green',
    '#9E9D24': 'Lime',
    '#F9A825': 'Yellow',
    '#FF8F00': 'Amber',
    '#EF6C00': 'Orange',
    '#D84315': 'Deep Orange',
    '#4E342E': 'Brown',
    '#37474F': 'Blue Grey'
}
