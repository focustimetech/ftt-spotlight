import React from 'react'

interface ILayoutProps {
    children: any
}

const Layout = (props: ILayoutProps) => {
    return (
        <div className='layout'>{props.children}</div>
    )
}

export default Layout
