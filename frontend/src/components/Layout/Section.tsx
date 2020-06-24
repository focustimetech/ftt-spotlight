import classNames from 'classnames'
import React from 'react'

interface ISectionProps extends React.HTMLAttributes<HTMLDivElement> {
    fullWidth?: boolean
}

const Section = (props: ISectionProps) => {
    const { fullWidth, children, className, ...rest } = props
    return (
        <section className={classNames('section', className, { '--fullwidth': props.fullWidth })} {...rest}>
            {props.children}
        </section>
    )
}

export default Section
