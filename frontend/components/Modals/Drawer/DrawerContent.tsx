import React from 'react'

interface IDrawerContentProps {
    children: any
}

const DrawerContent = (props: IDrawerContentProps) => {
    return (
        <div className='drawer__content'>{props.children}</div>
    )
}

export { DrawerContent }
