import classNames from 'classnames'
import React from 'react'

import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: `0 -${theme.spacing(0.5)}px`,
        display: 'flex',
        flexFlow: 'row wrap',

        '& > *': {
            margin: theme.spacing(0.5)
        }
    }
}))

const ChipContainer = (props: { children: any, className?: string }) => {
    const classes = useStyles()

    return (
        <ul className={classNames(classes.root, props.className)}>{props.children}</ul>
    )
}

export default ChipContainer
