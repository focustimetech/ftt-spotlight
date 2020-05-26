import classNames from 'classnames'
import React from 'react'

interface ISectionProps {
    children: any
    fullWidth?: boolean
}

const Section = (props: ISectionProps) => {
    return (
        <section className={classNames('section', { '--fullwidth': props.fullWidth })}>
            {props.children}
        </section>
    )
}

export default Section
