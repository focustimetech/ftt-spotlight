import classNames from 'classnames'
import React, { CSSProperties } from 'react'

export interface IFlexboxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    alignItems?: CSSProperties['alignItems']
    justifyContent?: CSSProperties['justifyContent']
    padding?: boolean
}

const Flexbox = (props: IFlexboxProps) => {
    const { alignItems, children, className, justifyContent, padding, ...rest } = props
    const style = { alignItems, justifyContent }
    return (
        <div className={classNames('flexbox', className, { '--padding': padding })} style={style} {...rest}>
            {props.children}
        </div>
    )
}

export default Flexbox
