import classNames from 'classnames'
import React, { CSSProperties } from 'react'

export interface IFlexboxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    alignItems?: CSSProperties['alignItems']
    justifyContent?: CSSProperties['justifyContent']
    flex?: CSSProperties['flex']
    flexDirection?: CSSProperties['flexDirection']
    padding?: boolean
    disableSpacing?: boolean
}

const Flexbox = (props: IFlexboxProps) => {
    const {
        alignItems,
        children,
        className,
        flex,
        flexDirection,
        justifyContent,
        padding,
        disableSpacing,
        ...rest
    } = props
    const style = { alignItems, flex, flexDirection, justifyContent }

    return (
        <div className={classNames('flexbox', className, { '--padding': padding }, { '--disable-spacing': disableSpacing })} style={style} {...rest}>
            {props.children}
        </div>
    )
}

export default Flexbox
