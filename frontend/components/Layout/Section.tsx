import React from 'react'

interface ISectionProps {
    children: any
}

const Section = (props: ISectionProps) => {
    return (
        <section className='section'>{props.children}</section>
    )
}

export default Section
